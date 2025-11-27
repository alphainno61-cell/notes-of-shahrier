import { FormEvent, useState } from "react";
import { Head, useForm, Link, router } from "@inertiajs/react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

interface AboutSection {
  id: number;
  section_type: string;
  title: string;
  content: string;
  image: string | null;
  order: number;
  is_active: boolean;
}

interface Award {
  id: number;
  title: string;
  organization: string;
  award_date: string;
  order: number;
}

interface CorporateJourneyItem {
  id: number;
  step_number: number;
  title: string;
  company: string;
  description: string;
  icon_image: string | null;
  order: number;
}

interface Associate {
  id: number;
  name: string;
  logo_image: string | null;
  order: number;
  is_active: boolean;
}

interface AboutMePageSetting {
  id: number;
  banner: {
    label: string;
    title: string;
    banner_image: string;
    video_thumbnail: string;
    video_url: string;
  };
  report: {
    description: string;
    stat_1_value: string;
    stat_1_label: string;
    stat_2_value: string;
    stat_2_label: string;
    stat_3_value: string;
    stat_3_label: string;
    stat_4_value: string;
    stat_4_label: string;
    stat_5_value: string;
    stat_5_label: string;
    stat_6_value: string;
    stat_6_label: string;
    stat_7_value: string;
    stat_7_label: string;
  };
  awards: {
    section_title: string;
    section_subtitle: string;
  };
  corporate_journey: {
    title: string;
    philosophy_title: string;
    philosophy_image: string;
    background_image: string;
    logic_theory_title: string;
    logic_theory_content_1: string;
    logic_theory_content_2: string;
    logic_1_title: string;
    logic_1_content: string;
  };
  associates: {
    title: string;
    description: string;
    background_image: string;
  };
  travel: {
    section_title: string;
    section_subtitle: string;
    map_image: string;
  };
}

interface Props {
  aboutSections: AboutSection[];
  awards: Award[];
  corporateJourney: CorporateJourneyItem[];
  associates: Associate[];
  settings: AboutMePageSetting;
}

export default function AboutSectionsPage({
  aboutSections,
  awards,
  corporateJourney,
  associates,
  settings
}: Props) {
  const [previewImages, setPreviewImages] = useState<{ [key: string]: string }>({});

  const storySections = aboutSections.filter(s => s.section_type === 'story');
  const impactSection = aboutSections.find(s => s.section_type === 'impact');
  const travelSection = aboutSections.find(s => s.section_type === 'travel');

  // Banner form
  const bannerForm = useForm({
    label: settings?.banner?.label || 'About Me',
    title: settings?.banner?.title || '',
    banner_image: null as File | null,
    video_thumbnail: null as File | null,
    video_url: settings?.banner?.video_url || '',
  });

  // Report form
  const reportForm = useForm({
    description: settings?.report?.description || '',
    stat_1_value: settings?.report?.stat_1_value || '11',
    stat_1_label: settings?.report?.stat_1_label || 'Years Journey',
    stat_2_value: settings?.report?.stat_2_value || '200',
    stat_2_label: settings?.report?.stat_2_label || 'Projects',
    stat_3_value: settings?.report?.stat_3_value || '6',
    stat_3_label: settings?.report?.stat_3_label || 'Certification',
    stat_4_value: settings?.report?.stat_4_value || '5',
    stat_4_label: settings?.report?.stat_4_label || 'Int Article',
    stat_5_value: settings?.report?.stat_5_value || '4',
    stat_5_label: settings?.report?.stat_5_label || 'Books',
    stat_6_value: settings?.report?.stat_6_value || '4',
    stat_6_label: settings?.report?.stat_6_label || 'Books',
    stat_7_value: settings?.report?.stat_7_value || '100',
    stat_7_label: settings?.report?.stat_7_label || 'Mentoring',
  });

  // Corporate Journey form
  const corporateForm = useForm({
    title: settings?.corporate_journey?.title || 'Corporate Journey',
    philosophy_title: settings?.corporate_journey?.philosophy_title || 'My Philosophy',
    philosophy_image: null as File | null,
    background_image: null as File | null,
    logic_theory_title: settings?.corporate_journey?.logic_theory_title || 'Logic Theory',
    logic_theory_content_1: settings?.corporate_journey?.logic_theory_content_1 || '',
    logic_theory_content_2: settings?.corporate_journey?.logic_theory_content_2 || '',
    logic_1_title: settings?.corporate_journey?.logic_1_title || 'Logic #1',
    logic_1_content: settings?.corporate_journey?.logic_1_content || '',
  });

  // Associates form
  const associatesForm = useForm({
    title: settings?.associates?.title || 'Associate',
    description: settings?.associates?.description || '',
    background_image: null as File | null,
  });

  const handleBannerSubmit = (e: FormEvent) => {
    e.preventDefault();
    bannerForm.post('/admin/about-me-page-settings/update-banner', {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => toast.success("Banner settings updated successfully"),
    });
  };

  const handleReportSubmit = (e: FormEvent) => {
    e.preventDefault();
    reportForm.post('/admin/about-me-page-settings/update-report', {
      preserveScroll: true,
      onSuccess: () => toast.success("Report settings updated successfully"),
    });
  };

  const handleCorporateSubmit = (e: FormEvent) => {
    e.preventDefault();
    corporateForm.post('/admin/about-me-page-settings/update-corporate', {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => toast.success("Corporate settings updated successfully"),
    });
  };

  const handleAssociatesSubmit = (e: FormEvent) => {
    e.preventDefault();
    associatesForm.post('/admin/about-me-page-settings/update-associates', {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => toast.success("Associates settings updated successfully"),
    });
  };

  const handleDeleteSection = (id: number) => {
    if (confirm('Are you sure you want to delete this section?')) {
      router.delete(`/admin/about-sections/${id}`, {
        onSuccess: () => toast.success("Section deleted successfully"),
      });
    }
  };

  const handleDeleteAward = (id: number) => {
    if (confirm('Are you sure you want to delete this award?')) {
      router.delete(`/admin/awards/${id}`, {
        onSuccess: () => toast.success("Award deleted successfully"),
      });
    }
  };

  const handleDeleteCorporateItem = (id: number) => {
    if (confirm('Are you sure you want to delete this corporate journey item?')) {
      router.delete(`/admin/corporate-journey/${id}`, {
        onSuccess: () => toast.success("Corporate journey item deleted successfully"),
      });
    }
  };

  const handleDeleteAssociate = (id: number) => {
    if (confirm('Are you sure you want to delete this associate?')) {
      router.delete(`/admin/associates/${id}`, {
        onSuccess: () => toast.success("Associate deleted successfully"),
      });
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <Head title="About Page Management" />

        <div className="container mx-auto py-8 px-4 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              About Page Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage all sections of the About Me page
            </p>
          </div>

          <Tabs defaultValue="banner" className="space-y-6">
            <TabsList className="grid w-full grid-cols-8 lg:w-auto">
              <TabsTrigger value="banner">Banner</TabsTrigger>
              <TabsTrigger value="report">Report</TabsTrigger>
              <TabsTrigger value="awards">Awards</TabsTrigger>
              <TabsTrigger value="story">Story</TabsTrigger>
              <TabsTrigger value="impact">Impact</TabsTrigger>
              <TabsTrigger value="travel">Travel</TabsTrigger>
              <TabsTrigger value="corporate">Corporate</TabsTrigger>
              <TabsTrigger value="associates">Associates</TabsTrigger>
            </TabsList>

            {/* Banner Section */}
            <TabsContent value="banner">
              <Card>
                <CardHeader>
                  <CardTitle>Banner Section</CardTitle>
                  <CardDescription>
                    Manage the hero banner with video and title
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBannerSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="banner_label">Label</Label>
                      <Input
                        id="banner_label"
                        value={bannerForm.data.label}
                        onChange={(e) => bannerForm.setData("label", e.target.value)}
                        placeholder="About Me"
                      />
                    </div>

                    <div>
                      <Label htmlFor="banner_title">Title</Label>
                      <Textarea
                        id="banner_title"
                        value={bannerForm.data.title}
                        onChange={(e) => bannerForm.setData("title", e.target.value)}
                        placeholder="Remarkable lives respond to a greater purpose."
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="banner_image">Banner Image</Label>
                      <Input
                        id="banner_image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            bannerForm.setData("banner_image", file);
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setPreviewImages({ ...previewImages, banner_image: reader.result as string });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      {(previewImages.banner_image || settings?.banner?.banner_image) && (
                        <div className="mt-2">
                          <img
                            src={previewImages.banner_image || settings.banner.banner_image}
                            alt="Banner Preview"
                            className="h-32 object-contain"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="video_thumbnail">Video Thumbnail</Label>
                      <Input
                        id="video_thumbnail"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            bannerForm.setData("video_thumbnail", file);
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setPreviewImages({ ...previewImages, video_thumbnail: reader.result as string });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      {(previewImages.video_thumbnail || settings?.banner?.video_thumbnail) && (
                        <div className="mt-2">
                          <img
                            src={previewImages.video_thumbnail || settings.banner.video_thumbnail}
                            alt="Video Thumbnail Preview"
                            className="h-32 object-contain"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="video_url">Video URL (YouTube Embed)</Label>
                      <Input
                        id="video_url"
                        value={bannerForm.data.video_url}
                        onChange={(e) => bannerForm.setData("video_url", e.target.value)}
                        placeholder="https://www.youtube.com/embed/..."
                      />
                    </div>

                    <Button type="submit" disabled={bannerForm.processing}>
                      {bannerForm.processing ? 'Saving...' : 'Save Banner Settings'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Report Section */}
            <TabsContent value="report">
              <Card>
                <CardHeader>
                  <CardTitle>Report & Statistics Section</CardTitle>
                  <CardDescription>
                    Manage statistics and achievement report
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleReportSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="report_description">Description</Label>
                      <Textarea
                        id="report_description"
                        value={reportForm.data.description}
                        onChange={(e) => reportForm.setData("description", e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                        <div key={num} className="space-y-2">
                          <Label>Statistic {num}</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              placeholder="Value"
                              value={reportForm.data[`stat_${num}_value` as keyof typeof reportForm.data] as string}
                              onChange={(e) => reportForm.setData(`stat_${num}_value` as any, e.target.value)}
                            />
                            <Input
                              placeholder="Label"
                              value={reportForm.data[`stat_${num}_label` as keyof typeof reportForm.data] as string}
                              onChange={(e) => reportForm.setData(`stat_${num}_label` as any, e.target.value)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button type="submit" disabled={reportForm.processing}>
                      {reportForm.processing ? 'Saving...' : 'Save Report Settings'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Awards Section */}
            <TabsContent value="awards">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Awards Section</CardTitle>
                      <CardDescription>Manage awards and recognitions</CardDescription>
                    </div>
                    <Link href="/admin/awards/create">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Award
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Organization</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Order</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {awards.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            No awards found. Create your first one!
                          </TableCell>
                        </TableRow>
                      ) : (
                        awards.map((award) => (
                          <TableRow key={award.id}>
                            <TableCell className="font-medium">{award.title}</TableCell>
                            <TableCell>{award.organization}</TableCell>
                            <TableCell>{new Date(award.award_date).toLocaleDateString()}</TableCell>
                            <TableCell>{award.order}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem asChild>
                                    <Link href={`/admin/awards/${award.id}/edit`}>
                                      <Pencil className="mr-2 h-4 w-4" />
                                      Edit
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleDeleteAward(award.id)}
                                    className="text-destructive"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Story Section */}
            <TabsContent value="story">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Story Sections</CardTitle>
                      <CardDescription>Manage story sections (3 sections)</CardDescription>
                    </div>
                    <Link href="/admin/about-sections/create">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Story Section
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Order</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {storySections.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                            No story sections found. Create your first one!
                          </TableCell>
                        </TableRow>
                      ) : (
                        storySections.map((section) => (
                          <TableRow key={section.id}>
                            <TableCell className="font-medium">{section.title}</TableCell>
                            <TableCell>{section.order}</TableCell>
                            <TableCell>{section.is_active ? 'Active' : 'Inactive'}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem asChild>
                                    <Link href={`/admin/about-sections/${section.id}/edit`}>
                                      <Pencil className="mr-2 h-4 w-4" />
                                      Edit
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleDeleteSection(section.id)}
                                    className="text-destructive"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Impact Section */}
            <TabsContent value="impact">
              <Card>
                <CardHeader>
                  <CardTitle>Impact Section</CardTitle>
                  <CardDescription>
                    Entrepreneur and Technology impact content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {impactSection ? (
                    <div className="space-y-4">
                      <div>
                        <Label>Current Impact Section</Label>
                        <p className="text-sm text-muted-foreground mt-1">{impactSection.title}</p>
                      </div>
                      <Link href={`/admin/about-sections/${impactSection.id}/edit`}>
                        <Button>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit Impact Section
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <p className="text-muted-foreground mb-4">No impact section found.</p>
                      <Link href="/admin/about-sections/create">
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Create Impact Section
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Travel Section */}
            <TabsContent value="travel">
              <Card>
                <CardHeader>
                  <CardTitle>Travel Section</CardTitle>
                  <CardDescription>
                    Business travel countries and experiences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {travelSection ? (
                    <div className="space-y-4">
                      <div>
                        <Label>Current Travel Section</Label>
                        <p className="text-sm text-muted-foreground mt-1">{travelSection.title}</p>
                      </div>
                      <Link href={`/admin/about-sections/${travelSection.id}/edit`}>
                        <Button>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit Travel Section
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <p className="text-muted-foreground mb-4">No travel section found.</p>
                      <Link href="/admin/about-sections/create">
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Create Travel Section
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Corporate Journey Section */}
            <TabsContent value="corporate">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Corporate Journey Section</CardTitle>
                      <CardDescription>Manage philosophy and corporate journey items</CardDescription>
                    </div>
                    <Link href="/admin/corporate-journey/create">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Journey Item
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleCorporateSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="corp_title">Section Title</Label>
                      <Input
                        id="corp_title"
                        value={corporateForm.data.title}
                        onChange={(e) => corporateForm.setData("title", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="philosophy_title">Philosophy Title</Label>
                      <Input
                        id="philosophy_title"
                        value={corporateForm.data.philosophy_title}
                        onChange={(e) => corporateForm.setData("philosophy_title", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="logic_theory_title">Logic Theory Title</Label>
                      <Input
                        id="logic_theory_title"
                        value={corporateForm.data.logic_theory_title}
                        onChange={(e) => corporateForm.setData("logic_theory_title", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="logic_theory_content_1">Logic Theory Content 1</Label>
                      <Textarea
                        id="logic_theory_content_1"
                        value={corporateForm.data.logic_theory_content_1}
                        onChange={(e) => corporateForm.setData("logic_theory_content_1", e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="logic_theory_content_2">Logic Theory Content 2</Label>
                      <Textarea
                        id="logic_theory_content_2"
                        value={corporateForm.data.logic_theory_content_2}
                        onChange={(e) => corporateForm.setData("logic_theory_content_2", e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="logic_1_title">Logic #1 Title</Label>
                      <Input
                        id="logic_1_title"
                        value={corporateForm.data.logic_1_title}
                        onChange={(e) => corporateForm.setData("logic_1_title", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="logic_1_content">Logic #1 Content</Label>
                      <Textarea
                        id="logic_1_content"
                        value={corporateForm.data.logic_1_content}
                        onChange={(e) => corporateForm.setData("logic_1_content", e.target.value)}
                        rows={3}
                      />
                    </div>

                    <Button type="submit" disabled={corporateForm.processing}>
                      {corporateForm.processing ? 'Saving...' : 'Save Corporate Settings'}
                    </Button>
                  </form>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Journey Items</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Step</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>Order</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {corporateJourney.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                              No journey items found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          corporateJourney.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.step_number}</TableCell>
                              <TableCell className="font-medium">{item.title}</TableCell>
                              <TableCell>{item.company}</TableCell>
                              <TableCell>{item.order}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                      <Link href={`/admin/corporate-journey/${item.id}/edit`}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Edit
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => handleDeleteCorporateItem(item.id)}
                                      className="text-destructive"
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Associates Section */}
            <TabsContent value="associates">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Associates Section</CardTitle>
                      <CardDescription>Manage partners and associates</CardDescription>
                    </div>
                    <Link href="/admin/associates/create">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Associate
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleAssociatesSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="assoc_title">Section Title</Label>
                      <Input
                        id="assoc_title"
                        value={associatesForm.data.title}
                        onChange={(e) => associatesForm.setData("title", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="assoc_description">Description</Label>
                      <Textarea
                        id="assoc_description"
                        value={associatesForm.data.description}
                        onChange={(e) => associatesForm.setData("description", e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="assoc_background_image">Background Image</Label>
                      <Input
                        id="assoc_background_image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            associatesForm.setData("background_image", file);
                          }
                        }}
                      />
                      {settings?.associates?.background_image && (
                        <div className="mt-2">
                          <img
                            src={settings.associates.background_image}
                            alt="Background Preview"
                            className="h-32 object-contain"
                          />
                        </div>
                      )}
                    </div>

                    <Button type="submit" disabled={associatesForm.processing}>
                      {associatesForm.processing ? 'Saving...' : 'Save Associates Settings'}
                    </Button>
                  </form>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Associate List</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Order</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {associates.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                              No associates found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          associates.map((associate) => (
                            <TableRow key={associate.id}>
                              <TableCell className="font-medium">{associate.name}</TableCell>
                              <TableCell>{associate.order}</TableCell>
                              <TableCell>{associate.is_active ? 'Active' : 'Inactive'}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                      <Link href={`/admin/associates/${associate.id}/edit`}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Edit
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => handleDeleteAssociate(associate.id)}
                                      className="text-destructive"
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
