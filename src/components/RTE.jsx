import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from "../conf/conf";
import { useTheme } from "../context/ThemeContext";

export default function RTE({ name, control, label, defaultValue = "" }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-fg-muted">
          {label}
        </label>
      )}

      <div className="overflow-hidden rounded-xl border border-border">
        <Controller
          name={name || "content"}
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              apiKey={conf.tinyMceId}
              initialValue={defaultValue}
              key={isDark ? "dark" : "light"}
              init={{
                height: 500,
                menubar: true,
                skin: isDark ? "oxide-dark" : "oxide",
                content_css: isDark ? "dark" : "default",
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | removeformat | help",
                content_style:
                  "body { font-family:'Geist',Helvetica,Arial,sans-serif; font-size:15px; line-height:1.7 }",
                tinycomments_author: "inkwell",
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    </div>
  );
}
