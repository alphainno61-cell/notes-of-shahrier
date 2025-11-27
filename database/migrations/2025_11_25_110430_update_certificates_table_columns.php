<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('certificates', function (Blueprint $table) {
            $table->string('credential_id')->nullable()->after('expiry_date');
            $table->dropColumn(['description', 'category']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('certificates', function (Blueprint $table) {
            $table->dropColumn('credential_id');
            $table->text('description')->nullable()->after('issuing_organization');
            $table->string('category')->nullable()->after('expiry_date');
        });
    }
};
