import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { Button, Input, RTE, Select, Spinner } from "..";
import appwriteService from "../../appwrite/config";

export default function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    try {
      if (post) {
        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;
        if (file) appwriteService.deleteFile(post.featuredImage);

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });
        if (dbPost) navigate(`/post/${dbPost.$id}`);
      } else {
        const file = await appwriteService.uploadFile(data.image[0]);
        if (file) {
          data.featuredImage = file.$id;
          const dbPost = await appwriteService.createPost({
            ...data,
            userId: userData.$id,
            Author: userData.name,
          });
          if (dbPost) navigate(`/post/${dbPost.$id}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="grid gap-6 lg:grid-cols-3">
      {/* Main column */}
      <div className="space-y-5 lg:col-span-2">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <Input
            label="Title"
            placeholder="An irresistible headline…"
            className="mb-5"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug"
            placeholder="post-url-slug"
            {...register("slug", { required: true })}
            onInput={(e) =>
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              })
            }
          />
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <RTE
            label="Content"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-5">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-fg">
            <PhotoIcon className="h-5 w-5 text-accent" /> Featured image
          </h3>
          {post && (
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="mb-4 aspect-video w-full rounded-xl object-cover"
            />
          )}
          <Input
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
            {...register("image", { required: !post })}
          />
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-5"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full"
            variant={post ? "primary" : "primary"}
          >
            {isSubmitting ? (
              <Spinner />
            ) : post ? (
              "Update post"
            ) : (
              "Publish post"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
