import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FolderTree, Info, KanbanSquare, Search, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const InfoPage = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/lovable-uploads/5f4c90dc-855c-42b0-8834-74ff1bee8550.png"
              alt="MarkNote Logo"
              className="h-10 w-auto"
            />
            <h1 className="text-3xl font-bold tracking-tight">About MarkNote</h1>
          </div>
          <Link to="/">
            <Button variant="outline">Back to App</Button>
          </Link>
        </div>

        <p className="text-lg text-muted-foreground">
          MarkNote is a markdown-first note taking app with built-in organization, search, and a simple Kanban board for tracking tasks.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
              <FileText className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Markdown Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Write notes in markdown with live preview and syntax-highlighted code blocks.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
              <FolderTree className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Folder Organization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Keep notes tidy with expandable folders and a collapsible sidebar.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
              <Tag className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Categorize notes with tags and filter the whole library in one click.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
              <Search className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Search</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Instantly search note titles, content, and tags from the header.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
              <KanbanSquare className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Kanban Board</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Drag tasks between To Do, In Progress, and Done columns.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
              <Info className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Built for You</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                A simple, focused workspace for capturing ideas and getting things done.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
