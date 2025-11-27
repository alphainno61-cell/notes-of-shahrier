<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\BooksPageSetting;

class BooksPageSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BooksPageSetting::updateOrCreate(
            ['id' => 1],
            [
                'page_title' => 'Books',
                'banner_pattern_image' => '/assets/books/pattern_bg.png',
                'book_cover_image' => null,
                'banner_title' => 'Chat GPT: Risk or Opportunity?',
                'banner_description' => 'Living an extraordinary life means shaping it on your terms, filled with deep meaning and significant impact. Fueled by the quest for excellence and a strong sense of purpose, Shahriar Khan has motivated millions to dream boldly and strive for greater heights.',
                'banner_price' => 'Price: 240 BDT',
                'banner_button_text' => 'Read a Little',
                'highlights_section_title' => 'Book Highlights',
                'summary_section_title' => 'Book Summary',
                'summary_description' => 'Living an extraordinary life means shaping it on your terms, filled with deep meaning and significant impact. Fueled by the quest for excellence and a strong sense of purpose, Shahriar Khan has motivated millions to dream boldly and strive for greater heights.',
                'summary_fallback_text' => 'Recognized for excellence in delivering top-tier event planning services across the country, setting industry standards in creativity, organization, and client satisfaction.',
                'review_section_title' => 'Review',
                'review_default_text' => 'The Nightingale has easily found its way to one of my favorite books to recommend. Although some may feel daunted by the over 300 page book, it is worth every page. The characters are well written and relatable. Isabelle is definitely one of my all time favorite heroes.',
                'review_default_author_name' => 'Shah Alam Chowdhury',
                'review_default_author_title' => 'Managing Director',
                'review_default_author_company' => 'AB Company',
                'recommended_books_title' => 'Recommended Books',
                'recommended_books_subtitle' => 'Must Read Collection',
                'recommended_books_description' => 'Through real-world examples and strategic frameworks, Shahriar Khan offers a balanced perspective on leveraging AI opportunities while managing associated risks, making it an essential read for anyone interested in the future of technology and business.',
            ]
        );
    }
}
