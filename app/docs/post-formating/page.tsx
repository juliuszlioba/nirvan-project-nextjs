import type { Metadata } from 'next'
import { Literata } from 'next/font/google'

const literata = Literata({
	subsets: ['latin'],
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'Post formating',
}

const preseClass = `${literata.className} prose mx-auto w-full bg-background text-foreground lg:prose-lg prose-headings:text-center prose-headings:text-foreground prose-h1:font-normal prose-p:my-2 prose-p:indent-8 prose-p:leading-[1.45] prose-a:text-foreground prose-blockquote:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-ol:text-foreground prose-img:mx-auto`

export default async function Page() {
	return (
		<main>
			<h1 className="text-3xl">Post formating rules</h1>

			<p>Formating of text is based on Markdown Syntax. Here are examples:</p>

			<div className="space-y-24 pt-12 md:space-y-8">
				<div className="grid gap-8 md:grid-cols-2">
					<div className="border-gray border-b-2 border-dashed pb-4 pr-4 md:border-b-0 md:border-r-2">
						<div className="space-y-4">
							<p>
								<span className="text-fuchsia-700">#</span> Heading 1
							</p>
							<p>
								<span className="text-fuchsia-700">##</span> Heading 2
							</p>
							<p>
								<span className="text-fuchsia-700">###</span> Heading 3
							</p>
							<p>
								<span className="text-fuchsia-700">####</span> Heading 4
							</p>
						</div>
					</div>

					<div className={preseClass}>
						<h1>Heading 1</h1>
						<h2>Heading 2</h2>
						<h3>Heading 3</h3>
						<h4>Heading 4</h4>
					</div>
				</div>

				<div className="grid gap-8 md:grid-cols-2">
					<div className="border-gray border-b-2 border-dashed pb-4 pr-4 md:border-b-0 md:border-r-2">
						<div className="space-y-4">
							<p>
								Paragraph. Lorem, ipsum dolor sit amet consectetur adipisicing
								elit. Reiciendis quis quos velit esse cumque laborum, enim
								aliquid omnis aliquam dolore facere exercitationem obcaecati
								optio natus illum ipsam ratione impedit? Earum?
							</p>
						</div>
					</div>

					<div className={preseClass}>
						<p>
							Paragraph. Lorem, ipsum dolor sit amet consectetur adipisicing
							elit. Reiciendis quis quos velit esse cumque laborum, enim aliquid
							omnis aliquam dolore facere exercitationem obcaecati optio natus
							illum ipsam ratione impedit? Earum?
						</p>
					</div>
				</div>

				<div className="grid gap-8 md:grid-cols-2">
					<div className="border-gray border-b-2 border-dashed pb-4 pr-4 md:border-b-0 md:border-r-2">
						<div className="space-y-4">
							<p>
								<span className="text-fuchsia-700">**</span>bold text
								<span className="text-fuchsia-700">**</span>
							</p>
							<p>
								<span className="text-fuchsia-700">*</span>italicized text
								<span className="text-fuchsia-700">*</span>
							</p>
						</div>
					</div>

					<div className={preseClass}>
						<p>
							<strong>bold text</strong>
						</p>
						<p>
							<em>italicized text</em>
						</p>
					</div>
				</div>

				<div className="grid gap-8 md:grid-cols-2">
					<div className="border-gray border-b-2 border-dashed pb-4 pr-4 md:border-b-0 md:border-r-2">
						<div className="space-y-4">
							<p>
								<span className="text-fuchsia-700">&gt;</span> blockquote
							</p>
						</div>
					</div>

					<div className={preseClass}>
						<blockquote>
							<p>blockquote</p>
						</blockquote>
					</div>
				</div>

				<div className="grid gap-8 md:grid-cols-2">
					<div className="border-gray border-b-2 border-dashed pb-4 pr-4 md:border-b-0 md:border-r-2">
						<div className="space-y-4">
							<p>
								<span className="text-fuchsia-700">1.</span> First item
								<br />
								<span className="text-fuchsia-700">2.</span> Second item
								<br />
								<span className="text-fuchsia-700">3.</span> Third item
							</p>
						</div>
					</div>

					<div className={preseClass}>
						<ol>
							<li>First item</li>
							<li>Second item</li>
							<li>Third item</li>
						</ol>
					</div>
				</div>

				<div className="grid gap-8 md:grid-cols-2">
					<div className="border-gray border-b-2 border-dashed pb-4 pr-4 md:border-b-0 md:border-r-2">
						<div className="space-y-4">
							<p>
								<span className="text-fuchsia-700">-</span> First item
								<br />
								<span className="text-fuchsia-700">-</span> Second item
								<br />
								<span className="text-fuchsia-700">-</span> Third item
							</p>
						</div>
					</div>

					<div className={preseClass}>
						<ul>
							<li>First item</li>
							<li>Second item</li>
							<li>Third item</li>
						</ul>
					</div>
				</div>

				<div className="grid gap-8 md:grid-cols-2">
					<div className="border-gray border-b-2 border-dashed pb-4 pr-4 md:border-b-0 md:border-r-2">
						<div className="space-y-4">
							<p>
								<span className="text-fuchsia-700">`</span>code
								<span className="text-fuchsia-700">`</span>
							</p>
						</div>
					</div>

					<div className={preseClass}>
						<p>
							<code>code something</code>
						</p>
					</div>
				</div>

				<div className="grid gap-8 md:grid-cols-2">
					<div className="border-gray border-b-2 border-dashed pb-4 pr-4 md:border-b-0 md:border-r-2">
						<div className="space-y-4">
							<p className="text-fuchsia-700">
								[title](https://www.example.com)
							</p>
						</div>
					</div>

					<div className={preseClass}>
						<p>
							<a href="https://www.google.com">Link</a>
						</p>
					</div>
				</div>

				<div className="grid gap-8 md:grid-cols-2">
					<div className="border-gray border-b-2 border-dashed pb-4 pr-4 md:border-b-0 md:border-r-2">
						<div className="space-y-4">
							<p className="text-fuchsia-700">---</p>
						</div>
					</div>

					<div className={preseClass}>
						<hr />
					</div>
				</div>

				<div className="grid gap-8 md:grid-cols-2">
					<div className="border-gray border-b-2 border-dashed pb-4 pr-4 md:border-b-0 md:border-r-2">
						<div className="space-y-4">
							<p className="text-fuchsia-700">![alt text](image.jpg)</p>
						</div>
					</div>

					<div className={preseClass}>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src="https://images.unsplash.com/photo-1521946066376-4a1493ee78df?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=1171&amp;q=80"
							alt="Library"
							title="Library"
						></img>
					</div>
				</div>

				<div className="grid gap-8 md:grid-cols-2">
					<div className="border-gray border-b-2 border-dashed pb-4 pr-4 md:border-b-0 md:border-r-2">
						<div className="space-y-4">
							<p className="text-fuchsia-700">![alt text](image.jpg)</p>
							<span className="text-fuchsia-700">
								&lt;p class=&quot;picture-caption text-center&quot;&gt;
							</span>
							Picture caption
							<span className="text-fuchsia-700">&lt;/p&gt;</span>
						</div>
					</div>

					<div className={preseClass}>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src="https://images.unsplash.com/photo-1521946066376-4a1493ee78df?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=1171&amp;q=80"
							alt="Library"
							title="Library"
						></img>
						<p className="picture-caption text-center">Picture caption</p>
					</div>
				</div>
			</div>

			<h1 className="pt-12 text-3xl">Advanced post formating rules</h1>
			<p>
				These rules are not Markdown Syntax. Can be added more rules by request
				to website admin.
			</p>

			<div className="space-y-24 pt-12 md:space-y-8">
				<div className="grid gap-8 md:grid-cols-2">
					<div className="border-gray border-b-2 border-dashed pb-4 pr-4 md:border-b-0 md:border-r-2">
						<div className="space-y-4">
							<div>
								To add more space between Paragraph 1 and Paragraph 2 use class
								&apos;divider&apos;.
							</div>
							<div>
								Paragraph 1. Lorem, ipsum dolor sit amet consectetur adipisicing
								elit. Reiciendis quis quos velit esse cumque laborum.
							</div>
							<div>
								<span className="text-fuchsia-700">
									&lt;p class=&quot;divider&quot;&gt;
								</span>
								<span className="text-fuchsia-700">&lt;/p&gt;</span>
							</div>

							<div>
								Paragraph 2. Enim aliquid omnis aliquam dolore facere
								exercitationem obcaecati optio natus illum ipsam ratione
								impedit? Earum?
							</div>
							<div>
								<span className="text-fuchsia-700">
									&lt;p class=&quot;no-indent&quot;&gt;
								</span>
								Paragraph 3 with no indenting on paragraph. Enim aliquid omnis
								aliquam dolore facere exercitationem obcaecati optio natus illum
								ipsam ratione impedit? Earum?
								<span className="text-fuchsia-700">&lt;/p&gt;</span>
							</div>
						</div>
					</div>

					<div className={preseClass}>
						<p>
							To add more space between Paragraph 1 and Paragraph 2 use class
							&apos;divider&apos;.
						</p>
						<p>
							Paragraph 1. Lorem, ipsum dolor sit amet consectetur adipisicing
							elit. Reiciendis quis quos velit esse cumque laborum.
						</p>
						<p className="divider"></p>
						<p>
							Paragraph 2. Enim aliquid omnis aliquam dolore facere
							exercitationem obcaecati optio natus illum ipsam ratione impedit?
							Earum?
						</p>
						<p className="divider"></p>
						<p className="no-indent">
							Paragraph 3 with no indenting on paragraph. Enim aliquid omnis
							aliquam dolore facere exercitationem obcaecati optio natus illum
							ipsam ratione impedit? Earum?
						</p>
					</div>
				</div>

				<div className="grid gap-8 md:grid-cols-2">
					<div className="border-gray border-b-2 border-dashed pb-4 pr-4 md:border-b-0 md:border-r-2">
						<div className="space-y-4">
							<p>
								<span className="text-fuchsia-700">
									&lt;p class=&quot;text-right&quot;&gt;
								</span>
								Centered text
								<span className="text-fuchsia-700">&lt;/p&gt;</span>
							</p>

							<p>
								<span className="text-fuchsia-700">
									&lt;p class=&quot;text-right&quot;&gt;
								</span>
								Right aligned text
								<span className="text-fuchsia-700">&lt;/p&gt;</span>
							</p>

							<p>
								<span className="text-fuchsia-700">
									&lt;p class=&quot;underline&quot;&gt;
								</span>
								underline
								<span className="text-fuchsia-700">&lt;/p&gt;</span>
							</p>

							<p>
								<span className="text-fuchsia-700">
									&lt;p class=&quot;overline&quot;&gt;
								</span>
								overline
								<span className="text-fuchsia-700">&lt;/p&gt;</span>
							</p>

							<p>
								<span className="text-fuchsia-700">
									&lt;p class=&quot;line-through&quot;&gt;
								</span>
								line-through<span className="text-fuchsia-700">&lt;/p&gt;</span>
							</p>

							<p>
								<span className="text-fuchsia-700">
									&lt;p class=&quot;!indent-0&quot;&gt;
								</span>
								no indent (alternative)
								<span className="text-fuchsia-700">&lt;/p&gt;</span>
							</p>
						</div>
					</div>

					<div className={preseClass}>
						<p className="text-center">Centered text</p>
						<p className="text-right">Right aligned text</p>
						<p className="underline">underline</p>
						<p className="overline">overline</p>
						<p className="line-through">line-through</p>
						<p className="!indent-0">no indent</p>
					</div>
				</div>
			</div>
		</main>
	)
}
