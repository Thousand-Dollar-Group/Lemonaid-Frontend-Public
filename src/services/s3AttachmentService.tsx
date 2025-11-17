import { postAttachmentsForURLs } from "./ConversationApi";
import * as Models from "../models";

/**
 * Uploads a list of files to S3 using the corresponding pre-signed URLs.
 * * @param files The array of File objects to upload.
 * @param filesInfo The array of S3 pre-signed URL info obtained from the backend.
 * @returns An array of S3 keys for the successfully uploaded files.
 */
export const putIntoS3 = async (
  files: File[],
  filesInfo: Models.AttachmentS3Info[]
): Promise<string[]> => {
  if (files.length !== filesInfo.length) {
    throw new Error(
      "Files array and filesInfo array must have the same length."
    );
  }

  const s3Keys: string[] = [];

  // 1. Correct way to iterate over arrays using index in TypeScript/JavaScript
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileInfo = filesInfo[i];

    if (!file) {
      // Should not happen if files array is clean, but good for safety
      throw new Error(`File at index ${i} is missing.`);
    }

    if (fileInfo.filename !== file.name) {
      // Robust check, ensures the file and its corresponding URL match
      throw new Error(
        `File name mismatch at index ${i}. Expected: ${fileInfo.filename}, Got: ${file.name}`
      );
    }

    console.log(file.type);
    console.log(fileInfo.upload_url);

    // --- S3 Upload Logic ---
    const s3UploadResponse = await fetch(fileInfo.upload_url, {
      method: "PUT",
      headers: {
        // 🔑 Re-add this header! It MUST match the type used by the backend signature.
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!s3UploadResponse.ok) {
      // Check status text for S3 error details
      throw new Error(
        `Failed to upload file '${file.name}' to S3: ${s3UploadResponse.statusText}`
      );
    }
    // --- End S3 Upload Logic ---

    // 2. Collect the S3 Key/Path (assuming fileInfo includes the final key)
    // If your backend returns the final key, use it:
    if ("s3_key" in fileInfo) {
      s3Keys.push((fileInfo as any).s3_key);
    }
  }

  // 3. Return the array of all successful S3 keys
  return s3Keys;
};

/**
 * Main function to coordinate getting URLs and performing S3 uploads.
 */
export const uploadFilesToS3 = async (convIdToUse: string, files: File[]) => {
  // 1. Request signed URLs from your backend API
  const res = await postAttachmentsForURLs(convIdToUse, files);

  // 2. Upload the files to S3
  await putIntoS3(files, res.files);

  let attachments: Models.Attachment[] = [];

  for (let i = 0; i < files.length; i++) {
    const s3_url: string = res.files[i].upload_url.split("?AWSAccessKeyId")[0];
    const attachment: Models.Attachment = {
      file_type: files[i].type,
      filename: files[i].name,
      s3_url: s3_url,
      created_at: new Date().toISOString(),
    };
    attachments.push(attachment);
  }

  return attachments;
};

const convertBlobToFile = (fileBlob: Blob, fileName: string): File => {
  const file = new File([fileBlob], fileName, {
    type: fileBlob.type,
    lastModified: Date.now(),
  });
  return file;
};

export const getFilesFromS3 = async (
  file: Models.Attachment
): Promise<File> => {
  if (!file) {
    throw new Error("File is required to create a File object.");
  }

  if (!file.s3_url) {
    throw new Error("File URL is required to fetch file from s3.");
  }
  try {
    console.log("url= ", file.s3_url);
    const response = await fetch(file.s3_url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch file. HTTP Status: ${response.status} ${response.statusText}`
      );
    }
    const fileBlob: Blob = await response.blob();
    const fileObject: File = convertBlobToFile(fileBlob, file.filename);
    return fileObject;
  } catch (error) {
    console.error("Error fetching or processing file from S3:", error);
    throw error;
  }
};
