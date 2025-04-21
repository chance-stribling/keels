import ApplicationLogo from '@/Components/ApplicationLogo';
import Checkbox from '@/Components/Checkbox';
import Icon from '@/Components/Icon';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

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

            <div className="flex min-h-screen w-full flex-col justify-between bg-background font-bold">
                <header className="">
                    <nav className="flex justify-end">
                        {auth.user ? null : (
                            <>
                                <Link
                                    href={route('register')}
                                    className="flex items-center rounded-md px-3 py-2 text-accent ring-1 ring-transparent transition hover:text-primary max-sm:text-primary"
                                >
                                    <Icon
                                        name="file-pen"
                                        className="mr-2 mt-1 text-primary"
                                    />
                                    <p className="">Register</p>
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <main className="flex w-full flex-col items-center">
                    <div className="flex w-full flex-col items-center justify-center">
                        <ApplicationLogo className="mb-5 w-[350px]" />
                        {!auth.user ? (
                            <div className="w-[350px] rounded-lg bg-secondary px-6 py-4">
                                <div className="mb-2 w-full text-accent">
                                    <p className="underline">Login</p>
                                </div>

                                <form onSubmit={submit} className="">
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
                                            className="mt-1 w-full"
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
                                            className="mt-1 w-full"
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
                                            <span className="ms-2 text-sm text-primary">
                                                Remember me
                                            </span>
                                        </label>
                                    </div>

                                    <div className="mt-5 flex items-center justify-between">
                                        <Link
                                            href={route('password.request')}
                                            className="rounded-md text-sm text-primary underline hover:text-accent"
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
