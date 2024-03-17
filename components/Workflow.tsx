"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import resumeData from "@/data/resume";
import MarkdownView from "react-showdown";

const Workflow = () => {
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [resume, setResume] = useState(resumeData);
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api", {
        method: "POST",
        body: JSON.stringify({ role, company, description, resume }),
      });

      const data = await res.json();

      setCoverLetter(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setRole("");
    setCompany("");
    setDescription("");
    setResume("");
    setCoverLetter("");
  };

  return (
    <form onSubmit={generate}>
      <div className="flex items-start gap-8 mb-8">
        <div className="w-full">
          <label htmlFor="role">Role</label>

          <Input
            disabled={loading}
            id="role"
            className="w-full mt-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="w-full">
          <label htmlFor="company">Company</label>

          <Input
            disabled={loading}
            id="company"
            className="w-full mt-2"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>

      <div className="flex items-start gap-8">
        <div className="w-full">
          <label htmlFor="description">Job description</label>

          <Textarea
            disabled={loading}
            id="description"
            className="w-full mt-2"
            rows={12}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="w-full">
          <label htmlFor="resume">Resume</label>

          <Textarea
            disabled={loading}
            id="resume"
            className="w-full mt-2"
            rows={12}
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button disabled={loading} type="submit" className="mt-8" size="lg">
          Generate Cover Letter
        </Button>

        <Button
          disabled={loading}
          type="button"
          className="mt-8 p-2.5"
          variant="secondary"
          size="icon"
          onClick={reset}
        >
          <RotateCcw />
        </Button>
      </div>

      <hr className="border-slate-800 my-10" />

      <div>
        <div className="flex min-h-96 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm overflow-x-auto">
          {!coverLetter ? (
            <p className="text-slate-500">
              Your cover letter will appear here.
            </p>
          ) : (
            <MarkdownView
              markdown={coverLetter}
              options={{ tables: true, emoji: true }}
            />
          )}
        </div>
      </div>
    </form>
  );
};

export default Workflow;
