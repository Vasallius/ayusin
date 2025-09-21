<script lang="ts">
	interface CommunityReport {
		id: string;
		title: string;
		description: string;
		location: string;
		upvotes: number;
		image: string;
		category: string;
	}

	const mockReports: CommunityReport[] = [
		{
			id: '1',
			title: 'Problem noticed in Cagayan de Oro',
			description: 'General concern requiring attention from LGU.',
			location: 'Cagayan de Oro',
			upvotes: 27,
			image: '/placeholder-gradient-1.jpg',
			category: 'infrastructure'
		},
		{
			id: '2',
			title: 'Water pooling in Taguig',
			description: 'Water not draining after rain, possible clogged canal.',
			location: 'Taguig, Metro Manila',
			upvotes: 51,
			image: '/placeholder-gradient-2.jpg',
			category: 'drainage'
		},
		{
			id: '3',
			title: 'Concern around Cagayan de Oro',
			description: 'General concern requiring attention from LGU.',
			location: 'Cagayan de Oro',
			upvotes: 33,
			image: '/placeholder-gradient-3.jpg',
			category: 'safety'
		},
		{
			id: '4',
			title: 'Graffiti on wall at Iloilo City',
			description: 'Fresh graffiti covering public surface, request cleanup.',
			location: 'Iloilo City',
			upvotes: 63,
			image: '/placeholder-gradient-4.jpg',
			category: 'vandalism'
		},
		{
			id: '5',
			title: 'Overflowing trash bin at Baguio City',
			description: 'Trash accumulation with odor, needs immediate collection.',
			location: 'Baguio City',
			upvotes: 30,
			image: '/placeholder-gradient-5.jpg',
			category: 'sanitation'
		},
		{
			id: '6',
			title: 'Uneven pavement at Iloilo City',
			description: 'Broken pavement causing safety hazard for pedestrians.',
			location: 'Iloilo City',
			upvotes: 18,
			image: '/placeholder-gradient-6.jpg',
			category: 'infrastructure'
		},
		{
			id: '7',
			title: 'Uneven pavement at Baguio City',
			description: 'Road surface damage affecting vehicle traffic.',
			location: 'Baguio City',
			upvotes: 42,
			image: '/placeholder-gradient-7.jpg',
			category: 'infrastructure'
		},
		{
			id: '8',
			title: 'Water pooling in Iloilo City',
			description: 'Water not draining after rain, possible clogged canal.',
			location: 'Iloilo City',
			upvotes: 76,
			image: '/placeholder-gradient-8.jpg',
			category: 'drainage'
		},
		{
			id: '9',
			title: 'Flickering lamp near Iloilo City',
			description: 'Lamp post not working, area very dark at night.',
			location: 'Iloilo City',
			upvotes: 25,
			image: '/placeholder-gradient-9.jpg',
			category: 'lighting'
		},
		{
			id: '10',
			title: 'Vandalism near Taguig',
			description: 'Fresh graffiti covering public surface, request cleanup.',
			location: 'Taguig',
			upvotes: 14,
			image: '/placeholder-gradient-10.jpg',
			category: 'vandalism'
		}
	];

	let activeFilter = 'All';
	const filters = ['All', 'Trending', 'Recent'];

	function getGradientClass(index: number): string {
		const gradients = [
			'bg-gradient-to-br from-blue-400 to-emerald-400',
			'bg-gradient-to-br from-red-400 to-orange-400',
			'bg-gradient-to-br from-purple-400 to-blue-400',
			'bg-gradient-to-br from-cyan-400 to-emerald-400',
			'bg-gradient-to-br from-orange-400 to-red-400',
			'bg-gradient-to-br from-indigo-400 to-purple-400',
			'bg-gradient-to-br from-emerald-400 to-teal-400',
			'bg-gradient-to-br from-pink-400 to-rose-400',
			'bg-gradient-to-br from-violet-400 to-purple-400',
			'bg-gradient-to-br from-amber-400 to-orange-400'
		];
		return gradients[index % gradients.length];
	}
</script>

<div class="min-h-screen bg-gray-50">
	<!-- Header -->
	<header class="bg-white shadow-sm border-b">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center h-16">
				<h1 class="text-xl font-semibold text-gray-900">Community Reports</h1>
				<button class="text-blue-600 text-sm font-medium">Stats</button>
			</div>
		</div>
	</header>

	<!-- Filter Tabs -->
	<div class="bg-white border-b">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex space-x-1 py-4">
				{#each filters as filter}
					<button
						on:click={() => (activeFilter = filter)}
						class="px-4 py-2 rounded-full text-sm font-medium transition-colors
							{activeFilter === filter
								? 'bg-blue-100 text-blue-700'
								: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}"
					>
						{filter}
					</button>
				{/each}
			</div>
		</div>
	</div>

	<!-- Main Content -->
	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<!-- Reports Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
			{#each mockReports as report, index}
				<div class="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
					<!-- Image Placeholder -->
					<div class="h-48 {getGradientClass(index)} flex items-center justify-center">
						<div class="text-white/80">
							<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
							</svg>
						</div>
						<span class="ml-2 text-white/90 text-sm font-medium">Sample image</span>
					</div>

					<!-- Content -->
					<div class="p-4">
						<h3 class="font-medium text-gray-900 mb-2 line-clamp-2">{report.title}</h3>
						<p class="text-sm text-gray-600 mb-3 line-clamp-2">{report.description}</p>

						<!-- Location and Upvotes -->
						<div class="flex items-center justify-between">
							<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
								{report.location}
							</span>
							<div class="flex items-center text-gray-500">
								<svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
									<path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
								</svg>
								<span class="text-sm font-medium">{report.upvotes}</span>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</main>

	<!-- Bottom Navigation -->
	<nav class="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
		<div class="flex justify-around items-center h-16">
			<!-- Feed -->
			<button class="flex flex-col items-center space-y-1 px-4 py-2 text-blue-600">
				<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
					<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
				</svg>
				<span class="text-xs font-medium">Feed</span>
			</button>

			<!-- Report -->
			<button class="flex flex-col items-center space-y-1 px-4 py-2 text-gray-600">
				<div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
					<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
					</svg>
				</div>
				<span class="text-xs font-medium">Report</span>
			</button>

			<!-- Activity -->
			<button class="flex flex-col items-center space-y-1 px-4 py-2 text-gray-600 relative">
				<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
					<path d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 16H6v-2h2v2zm0-4H6v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2z" />
				</svg>
				<span class="text-xs font-medium">Activity</span>
				<!-- Notification Badge -->
				<div class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
					<span class="text-xs font-bold text-white">310</span>
				</div>
			</button>
		</div>
	</nav>

	<!-- Add bottom padding to account for fixed navigation -->
	<div class="h-16"></div>
</div>
