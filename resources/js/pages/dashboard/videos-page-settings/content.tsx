import { FormEvent } from "react";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface VideosPageSetting {
    id: number;
    banner_videos_section_title: string | null;
    all_videos_section_title: string | null;
    short_videos_section_title: string | null;
}

interface Props {
    settings: VideosPageSetting;
}

export default function VideosPageSettingsContent({ settings }: Props) {
    const { data, setData, post, processing } = useForm({
        banner_videos_section_title: settings?.banner_videos_section_title || "Featured Videos",
        all_videos_section_title: settings?.all_videos_section_title || "All Videos",
        short_videos_section_title: settings?.short_videos_section_title || "Short Videos",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/admin/videos-page-settings/update", {
            preserveScroll: true,
            onSuccess: () => toast.success("Content settings updated successfully"),
        });
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="Videos - Content Settings" />

                <div className="container mx-auto py-8 px-4 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">Content Settings</h1>
                        <p className="text-muted-foreground mt-2">Configure video sections</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Video Sections</CardTitle>
                                <CardDescription>Set titles for different video sections</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="banner_videos_section_title">Banner Videos Section Title</Label>
                                    <Input
                                        id="banner_videos_section_title"
                                        value={data.banner_videos_section_title}
                                        onChange={(e) => setData("banner_videos_section_title", e.target.value)}
                                        placeholder="Featured Videos"
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="all_videos_section_title">All Videos Section Title</Label>
                                    <Input
                                        id="all_videos_section_title"
                                        value={data.all_videos_section_title}
                                        onChange={(e) => setData("all_videos_section_title", e.target.value)}
                                        placeholder="All Videos"
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="short_videos_section_title">Short Videos Section Title</Label>
                                    <Input
                                        id="short_videos_section_title"
                                        value={data.short_videos_section_title}
                                        onChange={(e) => setData("short_videos_section_title", e.target.value)}
                                        placeholder="Short Videos"
                                        className="mt-1"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing} size="lg">
                                {processing ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
