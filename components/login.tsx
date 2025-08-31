"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { LLM_API_KEY_ID } from "@/lib/constants";
import { getDisplayableKey } from "@/lib/helpers";

const FormSchema = z.object({
  [LLM_API_KEY_ID]: z
    .string()
    .min(10, {
      message: "The API key must be at least 10 characters.",
    })
    .max(256, {
      message: "The API key must not be longer than 256 characters.",
    }),
});

const DESCRIPTION = (
  <>
    You can create an Open AI API key{" "}
    <a
      href="https://platform.openai.com/api-keys"
      className="font-medium text-cyan-600"
    >
      here
    </a>
    .
  </>
);

export default function Login() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    reValidateMode: "onBlur",
  });

  const elementRef = useRef<HTMLTextAreaElement>(null);
  const llmApiKeyRef = useRef("");

  const handleChange =
    (fieldOnChange: (value: string) => void) =>
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      llmApiKeyRef.current = event.target.value;

      fieldOnChange(getDisplayableKey(event.target.value));
      form.trigger();
      elementRef.current?.blur();
    };

  const saveAndVibecode = () => {
    console.log("LLM API key:", llmApiKeyRef.current);

    toast("You saved the following LLM API key", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">
            {getDisplayableKey(llmApiKeyRef.current, true)}
          </code>
        </pre>
      ),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(saveAndVibecode)}
        className="w-2xs space-y-6 sm:w-sm"
      >
        <FormField
          control={form.control}
          name={LLM_API_KEY_ID}
          render={({ field }) => (
            <FormItem>
              <FormLabel>LLM API key</FormLabel>

              <FormControl>
                <Textarea
                  placeholder="sk-XXX"
                  className="resize-none"
                  {...field}
                  onChange={handleChange(field.onChange)}
                  onFocus={() => field.onChange("")}
                  ref={elementRef}
                  value={field.value}
                />
              </FormControl>

              <FormDescription>{DESCRIPTION}</FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="select-none" type="submit">
          Save and vibe code
        </Button>
      </form>
    </Form>
  );
}
