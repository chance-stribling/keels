<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class RefreshAndSeedUser extends Command
{
    protected $signature = 'db:refresh-and-seed-user';
    protected $description = 'Run migrate:fresh and create a default user';

    public function handle()
    {
        $this->call('migrate:fresh');

        $user = User::create([
            'name' => 'Chance',
            'email' => 'cstribling1717@gmail.com',
            'password' => Hash::make('keelskeels'),
        ]);

        $this->info("Database refreshed and default user created:");
        $this->line("Email: {$user->email}");
        $this->line("Password: keelskeels");
    }
}
