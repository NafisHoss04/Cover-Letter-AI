type PromptProps = {
  role?: string | null | undefined;
  company?: string | null | undefined;
  description?: string | null | undefined;
  resume?: string | null | undefined;
  AIResponse?: string | null | undefined;
};

export const getPrompt = (
  step: Number,
  { role, company, description, resume, AIResponse }: PromptProps = {}
): string => {
  switch (step) {
    case 0:
      return `You are an enthusiastic and helpful specializing in Cover Letter writing, which lets users land interviews. You do not write conventional cover letters filled with buzzwords and cliches. Instead, you embrace a simple yet conversational strategy to write a cover letter with some story-telling that sounds professional yet personable.`;
    case 1:
      return `Based on this job description, what is the biggest challenge someone in this position would face day-to-day? Give me the root cause of this issue.
"""
${description}
"""`;
    case 2:
      return `You are currently working as a Software Engineer in the Tech industry and you're applying for this ${role} position at ${company}.

Write an attention-grabbing hook for your cover letter that highlights your experience and qualifications in a way that shows you empathize and can successfully take on the challenges of the ${role} role.

Consider incorporating specific examples of how you've tackled these challenges in your past work, and explore creative ways to express your enthusiasm for the opportunity. Keep your hook within 100 words.`;
    case 3:
      return `You are writing an unique yet fully professional cover letter applying for the ${role} position at ${company}. Here's what you have so far:
"""
${AIResponse}
"""

Finish writing the cover letter based on your resume and keep it within 300 words. Here’s your resume:
"""
${resume}
"""

Please mention only one most relevant achievement from your resume with a quick little summary of others. Keep your response in markdown format. Avoid using "Imagine a world..." or salesy words like "magic" and "revolutionary" or generic phrases like "I am excited", "I came across...", "I hope you are...", "I'm ...", "My name is...", etc. Use simple words in a friendly yet professional way.

Think out-of-the-box step by step. You can do it!`;
    default:
      return "";
  }
};
