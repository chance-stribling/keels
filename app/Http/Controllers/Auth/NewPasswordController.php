<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class NewPasswordController extends Controller
{
    protected $validPassphrases = [
        "Warriors' Path State Park",
        "Warriors Path State Park",
        "Warrior Path State Park",
        "Warriors' Path",
        "Warriors Path",
        "Warrior Path ",
    ];

    /**
     * Display the password reset view.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Auth/ResetPassword', [
            'email' => $request->email,
        ]);
    }

    /**
     * Handle an incoming new password request.
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

        $enteredPassphrase = strtolower($request->passphrase);

        if (!in_array($enteredPassphrase, array_map('strtolower', $this->validPassphrases))) {
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
