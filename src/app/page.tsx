import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon, Globe2Icon, LanguagesIcon } from "lucide-react";
import { features, steps } from "../enums/home.enum";

export default function HomePage() {
	return (
		<main className="flex flex-1 flex-col overflow-x-hidden bg-white text-slate-900">
			{/* Features */}
			<section id="features" className="border-y border-slate-100 bg-slate-50/70">
				<div className="mx-auto max-w-7xl p-4 sm:px-6 sm:py-24 lg:px-8">
					<div className="mx-auto max-w-2xl text-center">
						<span className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">Why MyTranslator</span>

						<h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Translation made simple</h2>

						<p className="mt-4 leading-7 text-slate-600">Everything you need to make multilingual communication easier and more accessible.</p>
					</div>

					<div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
						{features.map(({ icon: Icon, title, description, color }) => (
							<article
								key={title}
								className="group rounded-2xl border border-slate-200/80 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-950/5">
								<span className={`flex size-12 items-center justify-center rounded-xl ${color}`}>
									<Icon className="size-6" />
								</span>

								<h3 className="mt-5 text-lg font-bold">{title}</h3>

								<p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>

								<div className="mt-5 flex items-center gap-1 text-sm font-semibold text-indigo-600 opacity-0 transition group-hover:opacity-100">
									Learn more
									<ArrowUpRightIcon className="size-4" />
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			{/* How it works */}
			<section id="how-it-works">
				<div className="mx-auto max-w-7xl p-4 sm:px-6 sm:py-24 lg:px-8">
					<div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
						<div>
							<span className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">How it works</span>

							<h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Endless possibilities</h2>

							<p className="mt-5 max-w-lg leading-7 text-slate-600">No complicated setup. Just choose your languages, enter your text, and get started.</p>

							<Link href="/profile" className="mt-8 inline-flex items-center gap-2 font-semibold text-indigo-600 transition hover:gap-3">
								Get started today
								<ArrowRightIcon className="size-4" />
							</Link>
						</div>

						<div className="space-y-4">
							{steps.map(({ number, title, description }) => (
								<article key={title} className="flex gap-5 rounded-2xl border border-slate-200 p-5 sm:gap-6 sm:p-6">
									<span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-600">{number}</span>

									<div>
										<h3 className="font-bold">{title}</h3>

										<p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
									</div>
								</article>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section id="about" className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
				<div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-linear-to-br from-indigo-600 via-indigo-600 to-violet-700 px-6 py-14 text-center text-white sm:px-12 sm:py-16 lg:px-20">
					<div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full border-40 border-white/5" />

					<div className="pointer-events-none absolute -bottom-32 -left-16 size-72 rounded-full border-40 border-white/5" />

					<div className="relative mx-auto max-w-2xl">
						<span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-white/15">
							<Globe2Icon className="size-6" />
						</span>

						<h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">Ready to connect with the world?</h2>

						<p className="mt-5 leading-7 text-indigo-100">Make language a bridge, not a barrier. Start your translation journey today.</p>

						<Link
							href="/words"
							className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 transition hover:-translate-y-0.5 hover:bg-indigo-50">
							Get started for free
							<ArrowRightIcon className="size-4" />
						</Link>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="mt-auto border-t border-slate-200 bg-slate-50">
				<div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-7 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
					<div className="flex items-center gap-2">
						<span className="flex size-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
							<LanguagesIcon className="size-4" />
						</span>

						<span className="font-bold">MyTranslator</span>
					</div>

					<p className="text-sm text-slate-500">Making communication easier, one translation at a time.</p>

					<p className="text-xs text-slate-400">© {new Date().getFullYear()} MyTranslator</p>
				</div>
			</footer>
		</main>
	);
}
