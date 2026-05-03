import LoginForm from "@/components/forms/loginForm";
export default function Login() {

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
            “Your digital workspace, simplified.”
          </p>
          <p className="text-sm opacity-90">
            Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non.
          </p>
        </div>
      </section>

      <section className="primary flex items-center justify-center p-10">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Login</h1>
        </div>
            <LoginForm
            type="user"
            />
          <p className="text-sm text-slate-600">
            Don’t have an account? <a href="/sign-up" className="font-semibold text-blue-600">Create an account</a>
          </p>
        </div>
      </section>
    </main>
  );
}
