"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Minus, Save, Eye, Download } from "lucide-react";
import { toast } from "sonner";
import { ParsedResumeData } from "@/lib/resume-parser";

interface PortfolioEditorProps {
  portfolioId: string;
  initialData: ParsedResumeData;
  onSaveAction: (data: ParsedResumeData) => void;
  onPreviewAction: () => void;
  onDownloadAction: () => void;
}

export default function PortfolioEditor({
  portfolioId,
  initialData,
  onSaveAction,
  onPreviewAction,
  onDownloadAction,
}: PortfolioEditorProps) {
  const [data, setData] = useState<ParsedResumeData>(initialData);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/portfolio/${portfolioId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Portfolio saved successfully!");
        onSaveAction(data);
      } else {
        toast.error("Failed to save portfolio");
      }
    } catch (error) {
      toast.error("Failed to save portfolio");
    } finally {
      setIsSaving(false);
    }
  };

  const addExperience = () => {
    setData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: "",
          position: "",
          duration: "",
          description: "",
          achievements: [],
        },
      ],
    }));
  };

  const removeExperience = (index: number) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const addProject = () => {
    setData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          name: "",
          description: "",
          technologies: [],
          link: "",
        },
      ],
    }));
  };

  const removeProject = (index: number) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const addEducation = () => {
    setData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          institution: "",
          degree: "",
          field: "",
          year: "",
          gpa: "",
        },
      ],
    }));
  };

  const removeEducation = (index: number) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Edit Your Portfolio</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onPreviewAction}>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button variant="outline" onClick={onDownloadAction}>
            <Download className="mr-2 h-4 w-4" />
            Download Code
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={data.personalInfo.name}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          name: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.personalInfo.email}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          email: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={data.personalInfo.phone}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          phone: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={data.personalInfo.location}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          location: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={data.personalInfo.linkedin || ""}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          linkedin: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    value={data.personalInfo.github || ""}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          github: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea
                  id="summary"
                  rows={4}
                  value={data.summary}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, summary: e.target.value }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Work Experience
                <Button onClick={addExperience} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Experience
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Experience {index + 1}</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeExperience(index)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => {
                          const newExp = [...data.experience];
                          newExp[index].company = e.target.value;
                          setData((prev) => ({ ...prev, experience: newExp }));
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Position</Label>
                      <Input
                        value={exp.position}
                        onChange={(e) => {
                          const newExp = [...data.experience];
                          newExp[index].position = e.target.value;
                          setData((prev) => ({ ...prev, experience: newExp }));
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input
                      value={exp.duration}
                      onChange={(e) => {
                        const newExp = [...data.experience];
                        newExp[index].duration = e.target.value;
                        setData((prev) => ({ ...prev, experience: newExp }));
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      rows={3}
                      value={exp.description}
                      onChange={(e) => {
                        const newExp = [...data.experience];
                        newExp[index].description = e.target.value;
                        setData((prev) => ({ ...prev, experience: newExp }));
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Projects
                <Button onClick={addProject} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Project
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.projects.map((project, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Project {index + 1}</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeProject(index)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label>Project Name</Label>
                    <Input
                      value={project.name}
                      onChange={(e) => {
                        const newProjects = [...data.projects];
                        newProjects[index].name = e.target.value;
                        setData((prev) => ({ ...prev, projects: newProjects }));
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      rows={3}
                      value={project.description}
                      onChange={(e) => {
                        const newProjects = [...data.projects];
                        newProjects[index].description = e.target.value;
                        setData((prev) => ({ ...prev, projects: newProjects }));
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Technologies (comma-separated)</Label>
                    <Input
                      value={project.technologies.join(", ")}
                      onChange={(e) => {
                        const newProjects = [...data.projects];
                        newProjects[index].technologies = e.target.value
                          .split(",")
                          .map((t) => t.trim());
                        setData((prev) => ({ ...prev, projects: newProjects }));
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Project Link</Label>
                    <Input
                      value={project.link || ""}
                      onChange={(e) => {
                        const newProjects = [...data.projects];
                        newProjects[index].link = e.target.value;
                        setData((prev) => ({ ...prev, projects: newProjects }));
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Education
                <Button onClick={addEducation} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Education
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.education.map((edu, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Education {index + 1}</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeEducation(index)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Institution</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => {
                          const newEdu = [...data.education];
                          newEdu[index].institution = e.target.value;
                          setData((prev) => ({ ...prev, education: newEdu }));
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Degree</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => {
                          const newEdu = [...data.education];
                          newEdu[index].degree = e.target.value;
                          setData((prev) => ({ ...prev, education: newEdu }));
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Field of Study</Label>
                      <Input
                        value={edu.field}
                        onChange={(e) => {
                          const newEdu = [...data.education];
                          newEdu[index].field = e.target.value;
                          setData((prev) => ({ ...prev, education: newEdu }));
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Year</Label>
                      <Input
                        value={edu.year}
                        onChange={(e) => {
                          const newEdu = [...data.education];
                          newEdu[index].year = e.target.value;
                          setData((prev) => ({ ...prev, education: newEdu }));
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>GPA (optional)</Label>
                    <Input
                      value={edu.gpa || ""}
                      onChange={(e) => {
                        const newEdu = [...data.education];
                        newEdu[index].gpa = e.target.value;
                        setData((prev) => ({ ...prev, education: newEdu }));
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="technical-skills">
                  Technical Skills (comma-separated)
                </Label>
                <Textarea
                  id="technical-skills"
                  rows={3}
                  value={data.skills.technical.join(", ")}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      skills: {
                        ...prev.skills,
                        technical: e.target.value
                          .split(",")
                          .map((skill) => skill.trim())
                          .filter((skill) => skill.length > 0),
                      },
                    }))
                  }
                  placeholder="JavaScript, React, Node.js, Python, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="soft-skills">
                  Soft Skills (comma-separated)
                </Label>
                <Textarea
                  id="soft-skills"
                  rows={3}
                  value={data.skills.soft.join(", ")}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      skills: {
                        ...prev.skills,
                        soft: e.target.value
                          .split(",")
                          .map((skill) => skill.trim())
                          .filter((skill) => skill.length > 0),
                      },
                    }))
                  }
                  placeholder="Leadership, Communication, Problem Solving, etc."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
