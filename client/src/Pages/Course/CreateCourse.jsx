import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import HomeLayout from "@/Layouts/HomeLayout";
import axios from "axios";

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be 100 characters or less"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description must be 500 characters or less"),
  category: z.enum(["web-development", "devops", "system-design", "web3"], {
    required_error: "Please select a category",
  }),
  thumbnail: z.instanceof(FileList).refine((files) => files.length > 0, "Thumbnail is required"),
  author: z.string().min(1, "Author name is required").max(50, "Author name must be 50 characters or less"),
});

export default function CreateCourse() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });


  const token  = localStorage.getItem("token")
  

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('category', values.category);
      formData.append('createdBy', values.author);
      
      // Append the file
      if (values.thumbnail && values.thumbnail[0]) {
        formData.append('thumbnail', values.thumbnail[0]);
      }

      const token = localStorage.getItem("token");
      
      const { data } = await axios.post("http://localhost:3000/api/v1/course", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log(data);
      toast.success("Post published successfully!");
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to publish post. Please try again.");
    }
  };

  return (
    <HomeLayout>
      <div className="min-h-[90vh] bg-[#1b263b] py-6 sm:py-10 px-4 sm:px-6 lg:px-8 text-white">
        <Card className="max-w-lg mt-10 mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl sm:text-3xl font-bold">Create New Post</CardTitle>
            <CardDescription>Fill out the form to publish a new post.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Title
                </Label>
                <Input id="title" {...register("title")} placeholder="Enter a title" className="w-full" />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea id="description" {...register("description")} rows={4} placeholder="Describe your post" className="w-full" />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">
                  Category
                </Label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web-development">Web Development</SelectItem>
                        <SelectItem value="devops">DevOps</SelectItem>
                        <SelectItem value="system-design">System Design</SelectItem>
                        <SelectItem value="web3">Web 3</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="thumbnail" className="text-sm font-medium">
                  Thumbnail
                </Label>
                <Input id="thumbnail" type="file" {...register("thumbnail")} className="w-full" />
                {errors.thumbnail && <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="author" className="text-sm font-medium">
                  Created By
                </Label>
                <Input id="author" {...register("author")} placeholder="Enter the author's name" className="w-full" />
                {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
              </div>
              <Button type="submit" className="w-full">Publish Post</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </HomeLayout>
  );
}