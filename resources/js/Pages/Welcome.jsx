import ApplicationLogo from '@/Components/ApplicationLogo';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

// import logo from '../../../public/assets/images/logos/tab-color-trans.png';

export default function Welcome({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Welcome" />

            <div className="flex min-h-screen w-full flex-col justify-between bg-gradient-to-br from-[#FFFFFF] to-[#C8D6CD] font-bold">
                <header className="">
                    <nav className="flex justify-end">
                        {auth.user ? null : (
                            <>
                                <Link
                                    href={route('register')}
                                    className="rounded-md px-3 py-2 text-secondary ring-1 ring-transparent transition hover:text-accent max-sm:text-accent"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <main className="flex w-full flex-col items-center">
                    <div className="flex w-full flex-col items-center justify-center">
                        <ApplicationLogo className="w-[300px]" />
                        {!auth.user ? (
                            <div className="rounded-lg bg-primary px-6 py-4">
                                <div className="mb-2 w-full text-accent">
                                    <p className="underline">Login</p>
                                </div>

                                <form onSubmit={submit} className="w-[280px]">
                                    <div>
                                        <InputLabel
                                            htmlFor="email"
                                            value="Email"
                                        />

                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                        />

                                        <InputError
                                            message={errors.email}
                                            className="mt-2 text-error"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="password"
                                            value="Password"
                                        />

                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1"
                                            autoComplete="current-password"
                                            onChange={(e) =>
                                                setData(
                                                    'password',
                                                    e.target.value,
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.password}
                                            className="mt-2 text-error"
                                        />
                                    </div>

                                    <div className="mt-4 block">
                                        <label className="flex items-center">
                                            <Checkbox
                                                name="remember"
                                                checked={data.remember}
                                                onChange={(e) =>
                                                    setData(
                                                        'remember',
                                                        e.target.checked,
                                                    )
                                                }
                                            />
                                            <span className="ms-2 text-sm text-secondary">
                                                Remember me
                                            </span>
                                        </label>
                                    </div>

                                    <div className="mt-5 flex items-center justify-between">
                                        <Link
                                            href={route('password.request')}
                                            className="rounded-md text-sm text-secondary underline hover:text-accent"
                                        >
                                            Forgot your password?
                                        </Link>

                                        <PrimaryButton
                                            className="ms-4"
                                            disabled={processing}
                                        >
                                            Log in
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="mb-2 w-full flex-col text-center text-accent">
                                <p className="">Already Logged In, Cutie!</p>
                                <Link
                                    href={route('dashboard')}
                                    className="mt-5 inline-flex items-center rounded-md border border-transparent bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-accent"
                                >
                                    Dashboard
                                </Link>
                            </div>
                        )}
                    </div>
                </main>

                <footer className="py-8 text-center text-sm text-secondary">
                    Created by Chance S.
                </footer>
            </div>
        </>
    );
}
