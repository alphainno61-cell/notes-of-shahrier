<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Video;
use App\Models\PageContent;
use App\Models\VideosPageSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VideoController extends Controller
{
    public function index()
    {
        $settings = VideosPageSetting::first();
        
        $regularVideos = $settings && $settings->all_videos ? collect($settings->all_videos) : Video::where('is_short', false)
            ->orderBy('created_at', 'desc')
            ->get();

        $shortVideos = $settings && $settings->short_videos ? collect($settings->short_videos) : Video::where('is_short', true)
            ->orderBy('created_at', 'desc')
            ->get();
            
        $pageContent = PageContent::getPageContent('videos');

        return Inertia::render('Videos/Page/Videos', [
            'videos' => $regularVideos,
            'shortVideos' => $shortVideos,
            'pageContent' => $pageContent,
            'settings' => $settings,
        ]);
    }
}
