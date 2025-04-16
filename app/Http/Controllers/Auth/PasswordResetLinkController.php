<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetLinkController extends Controller
{
    protected $validPassphrase = 'buttchecks'; // Change this to your passphrase

    /**
     * Display the password reset link request view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // Validate input
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'passphrase' => 'required',
            'password' => 'required|confirmed',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // Check if the entered passphrase is correct
        if ($request->passphrase !== $this->validPassphrase) {
            return back()->withErrors(['passphrase' => 'The passphrase you entered is incorrect.']);
        }

        // Find the user and update the password
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return back()->withErrors(['email' => 'We couldn’t find a user with that email address.']);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        // Log the user in after password reset (optional)
        Auth::login($user);

        return redirect()->route('dashboard');
    }
}
