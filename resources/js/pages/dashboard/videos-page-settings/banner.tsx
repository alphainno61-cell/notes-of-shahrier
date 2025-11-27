import { FormEvent, useState } from "react";
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
    banner_title: string | null;
    banner_left_vector_image: string | null;
    banner_right_vector_image: string | null;
}

interface Props {
    settings: VideosPageSetting;
}

export default function VideosPageSettingsBanner({ settings }: Props) {
    const [leftVectorPreview, setLeftVectorPreview] = useState<string | null>(null);
    const [rightVectorPreview, setRightVectorPreview] = useState<string | null>(null);

    const { data, setData, post, processing } = useForm({
        banner_title: settings?.banner_title || "My Videos",
        banner_left_vector_image: null as File | null,
        banner_right_vector_image: null as File | null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/admin/videos-page-settings/update", {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setLeftVectorPreview(null);
                setRightVectorPreview(null);
                toast.success("Banner settings updated successfully");
            },
        });
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="Videos - Banner Settings" />

                <div className="container mx-auto py-8 px-4 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">Banner Settings</h1>
                        <p className="text-muted-foreground mt-2">Configure the banner section</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Banner Content</CardTitle>
                                <CardDescription>Set banner title and vector images</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="banner_title">Banner Title</Label>
                                    <Input
                                        id="banner_title"
                                        value={data.banner_title}
                                        onChange={(e) => setData("banner_title", e.target.value)}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="banner_left_vector_image">Left Vector Image</Label>
                                    <Input
                                        id="banner_left_vector_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData("banner_left_vector_image", file);
                                                const reader = new FileReader();
                                                reader.onloadend = () => setLeftVectorPreview(reader.result as string);
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="mt-1"
                                    />
                                    {(leftVectorPreview || settings?.banner_left_vector_image) && (
                                        <div className="mt-4 relative w-full h-48 bg-muted rounded-md overflow-hidden">
                                            <img
                                                src={leftVectorPreview || settings.banner_left_vector_image || ""}
                                                alt="Left Vector Preview"
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="banner_right_vector_image">Right Vector Image</Label>
                                    <Input
                                        id="banner_right_vector_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData("banner_right_vector_image", file);
                                                const reader = new FileReader();
                                                reader.onloadend = () => setRightVectorPreview(reader.result as string);
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="mt-1"
                                    />
                                    {(rightVectorPreview || settings?.banner_right_vector_image) && (
                                        <div className="mt-4 relative w-full h-48 bg-muted rounded-md overflow-hidden">
                                            <img
                                                src={rightVectorPreview || settings.banner_right_vector_image || ""}
                                                alt="Right Vector Preview"
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    )}
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
