<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use App\Models\DonationPageSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DonationController extends Controller
{
    public function index()
    {
        $donations = Donation::where('is_active', true)
            ->orderBy('order')
            ->orderBy('created_at', 'desc')
            ->get();

        $pageSettings = DonationPageSetting::first();

        return Inertia::render('Donation/Page/Donations', [
            'donations' => $donations,
            'pageSettings' => $pageSettings,
        ]);
    }

    public function show($id)
    {
        $donation = Donation::where('is_active', true)
            ->findOrFail($id);

        $pageSettings = DonationPageSetting::first();

        return Inertia::render('Donation/Page/DonationDetail', [
            'donation' => $donation,
            'pageSettings' => $pageSettings,
        ]);
    }
}