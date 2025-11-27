import { FormEvent, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DonationPageSetting {
    id: number;
    banner_quote: string | null;
    banner_subtitle: string | null;
    banner_default_image: string | null;
    donate_section_title: string | null;
    donate_section_description: string | null;
}

interface Props {
    settings: DonationPageSetting;
}

export default function DonationPageSettingsBanner({ settings }: Props) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        banner_quote: settings?.banner_quote || "",
        banner_subtitle: settings?.banner_subtitle || "My Thoughts",
        banner_default_image: null as File | null,
        donate_section_title: settings?.donate_section_title || "Support Our Cause",
        donate_section_description: settings?.donate_section_description || "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/admin/donation-page-settings/update", {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setImagePreview(null);
                toast.success("Banner settings updated successfully");
            },
        });
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="Donation Page - Banner Settings" />

                <div className="container mx-auto py-8 px-4 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">Banner Settings</h1>
                        <p className="text-muted-foreground mt-2">Configure the banner and donation sections</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Banner Content</CardTitle>
                                <CardDescription>Set the banner quote and image</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="banner_quote">Banner Quote</Label>
                                    <Textarea
                                        id="banner_quote"
                                        value={data.banner_quote}
                                        onChange={(e) => setData("banner_quote", e.target.value)}
                                        rows={3}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="banner_subtitle">Banner Subtitle</Label>
                                    <Input
                                        id="banner_subtitle"
                                        value={data.banner_subtitle}
                                        onChange={(e) => setData("banner_subtitle", e.target.value)}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="banner_default_image">Banner Image</Label>
                                    <Input
                                        id="banner_default_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData("banner_default_image", file);
                                                const reader = new FileReader();
                                                reader.onloadend = () => setImagePreview(reader.result as string);
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="mt-1"
                                    />
                                    {(imagePreview || settings?.banner_default_image) && (
                                        <div className="mt-4 relative w-full h-48 bg-muted rounded-md overflow-hidden">
                                            <img
                                                src={imagePreview || settings.banner_default_image || ""}
                                                alt="Banner Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Donate Section</CardTitle>
                                <CardDescription>Configure the donation call-to-action section</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="donate_section_title">Section Title</Label>
                                    <Input
                                        id="donate_section_title"
                                        value={data.donate_section_title}
                                        onChange={(e) => setData("donate_section_title", e.target.value)}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="donate_section_description">Section Description</Label>
                                    <Textarea
                                        id="donate_section_description"
                                        value={data.donate_section_description}
                                        onChange={(e) => setData("donate_section_description", e.target.value)}
                                        rows={3}
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
