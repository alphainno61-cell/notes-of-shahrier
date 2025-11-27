<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VideoController extends Controller
{
    public function index()
    {
        $videos = Video::orderBy('publish_date', 'desc')->get();
        return Inertia::render('dashboard/videos/index', ['videos' => $videos]);
    }

    public function create()
    {
        return Inertia::render('dashboard/videos/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'video_url' => 'required|string',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'duration' => 'nullable|string',
            'publish_date' => 'nullable|date',
            'views' => 'nullable|integer',
            'is_short' => 'nullable|boolean',
            'category' => 'nullable|string',
            'platform' => 'nullable|string',
            'order' => 'nullable|integer',
        ]);

        // Set defaults
        $validated['views'] = $validated['views'] ?? 0;
        $validated['is_short'] = $validated['is_short'] ?? false;
        $validated['order'] = $validated['order'] ?? 0;
        $validated['publish_date'] = $validated['publish_date'] ?? now();

        // Handle thumbnail upload
        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $request->file('thumbnail')->store('videos', 'public');
            $validated['thumbnail'] = '/storage/' . $thumbnailPath;
        }

        Video::create($validated);
        return redirect()->route('admin.videos.index')->with('success', 'Video created successfully');
    }

    public function edit(string $id)
    {
        $video = Video::findOrFail($id);
        return Inertia::render('dashboard/videos/edit', ['video' => $video]);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'video_url' => 'required|string',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'duration' => 'nullable|string',
            'publish_date' => 'nullable|date',
            'views' => 'nullable|integer',
            'is_short' => 'nullable|boolean',
            'category' => 'nullable|string',
            'platform' => 'nullable|string',
            'order' => 'nullable|integer',
        ]);

        $video = Video::findOrFail($id);

        // Set defaults for boolean/integer fields
        $validated['views'] = $validated['views'] ?? $video->views ?? 0;
        $validated['is_short'] = $validated['is_short'] ?? $video->is_short ?? false;
        $validated['order'] = $validated['order'] ?? $video->order ?? 0;

        // Handle thumbnail upload if a new file is provided
        if ($request->hasFile('thumbnail')) {
            // Delete old thumbnail if exists
            if ($video->thumbnail && file_exists(public_path($video->thumbnail))) {
                unlink(public_path($video->thumbnail));
            }
            
            $thumbnailPath = $request->file('thumbnail')->store('videos', 'public');
            $validated['thumbnail'] = '/storage/' . $thumbnailPath;
        }

        $video->update($validated);
        return redirect()->route('admin.videos.index')->with('success', 'Video updated successfully');
    }

    public function destroy(string $id)
    {
        Video::findOrFail($id)->delete();
        return redirect()->route('admin.videos.index')->with('success', 'Video deleted successfully');
    }
}
