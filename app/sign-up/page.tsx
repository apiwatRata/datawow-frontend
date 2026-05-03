import RegisterForm from "@/components/forms/registerForm";
import Link from 'next/link'
export default function Register() {

  return (
    <main className="min-h-screen grid grid-cols-2">
      <section className="secondary flex flex-col justify-between p-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-4 w-4 rounded-full bg-white" />
            <span className="text-xl font-bold">BRAND</span>
          </div>
        </div>

        <div className="max-w-md space-y-6">
          <p className="text-4xl font-bold leading-tight">
            “Powering the tools that power the team.”
          </p>
          <p className="text-sm opacity-90">
            Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non.
          </p>
        </div>
      </section>

      <section className="primary flex items-center justify-center p-10">
        <div className="w-full max-w-md space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Sign Up</h1>
            </div>
            <RegisterForm/>
            <p className="text-sm text-slate-600">
                Already have an account? <Link href='/' className="font-semibold text-blue-600">Login</Link>
            </p>
        </div>
      </section>
    </main>
  );
}
