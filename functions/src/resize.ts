import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";

// Files can't download directly from a storage bucket, so we need to create a function that will download the file into the cloud functions file system.
import {Storage} from "@google-cloud/storage";

// fs-extra is promise-based, not synchronous, like normal fs.
// import * as fs from "fs-extra";

// image resizing library
import * as sharp from "sharp";

// temp-dir to store temp data
import {tmpdir} from "os";
import {join, dirname} from "path";

const gcs = new Storage();

// functions.storage is information about the file that is stored in the bucket.
export const resizeImage = functions.storage
    .object()
    .onFinalize(async (object) => {
      const storageBucket = gcs.bucket(object.bucket);

      const bucketFilePath = object?.name;
      console.log(bucketFilePath);
      const fileName = bucketFilePath?.split("/").pop();

      // https://stackoverflow.com/questions/64278595/null-check-operator-used-on-a-null-value
      const tempFilePath = join(tmpdir(), bucketFilePath ?? "");

      const avatarFileName = "avatar_" + fileName;
      const tempAvatarFilePath = join(tmpdir(), avatarFileName);

      console.log(avatarFileName);
      console.log(tempAvatarFilePath);
      console.log(tempFilePath);

      // Prevent infinite loop, because when we resize the image, and upload it, the cloud function gets called again and again, decreasing the size of the image in every call.

      if (fileName?.includes("avatar_")) {
        console.log("Avatar file detected, skipping");
        return false;
      }

      await storageBucket
          .file(bucketFilePath ?? "")
          .download({destination: tempFilePath});

      await sharp(tempFilePath).resize(100, 100).toFile(tempAvatarFilePath);

      return storageBucket.upload(tempAvatarFilePath, {
        destination: join(bucketFilePath ?? "", avatarFileName),
      });
    });
