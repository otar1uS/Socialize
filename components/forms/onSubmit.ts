import { SetErrorsProps } from "@/TS/ActionTypes";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { Dispatch, FormEvent, SetStateAction } from "react";

import { z } from "zod";

const PostSchema = z.object({
  postPhoto: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Please upload a photo" }),
  caption: z
    .string()
    .min(2, { message: "Caption must be between 2 and 100 characters" })
    .max(100),
  tag: z
    .string()
    .min(2, { message: "Tag must be between 2 and 15 characters" })
    .max(15),
});

export async function onSubmit(
  event: FormEvent<HTMLFormElement>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setErrors: SetErrorsProps,
  user: any,
  router: any
) {
  event.preventDefault();
  setIsLoading(true);

  try {
    const formData = new FormData(event.currentTarget);
    const { photo, caption, tag } = Object.fromEntries(formData.entries());

    try {
      const post = PostSchema.parse({
        postPhoto: photo,
        caption: caption,
        tag: tag,
      });

      if (!post) return;

      // If the validation is successful, clear the errors
      setErrors([
        { postPhoto: false, postPhotoMessage: "" },
        { caption: false, captionMessage: "" },
        { tag: false, tagMessage: "" },
      ]);

      // ...
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Initialize a new errors object
        const newErrors = [
          { postPhoto: false, postPhotoMessage: "" },
          { caption: false, captionMessage: "" },
          { tag: false, tagMessage: "" },
        ];

        // Set the error for each field that caused a validation error
        for (const subError of error.errors) {
          const field = subError.path[0];
          const message = subError.message;

          if (field === "postPhoto") {
            newErrors[0] = { postPhoto: true, postPhotoMessage: message };
          } else if (field === "caption") {
            newErrors[1] = { caption: true, captionMessage: message };
          } else if (field === "tag") {
            newErrors[2] = { tag: true, tagMessage: message };
          }
        }

        // Update the state with the new errors
        setErrors(newErrors as any);
      }

      setIsLoading(false);
    }

    await fetch(`/api/create-post/${user?.id}`, {
      method: "POST",
      body: formData,
    });

    router.push("/");
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
}
