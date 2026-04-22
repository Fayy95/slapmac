export const ASSET = 'https://slapmac.com';

export const DOWNLOAD_URL =
	'https://staffwatcher.nyc3.cdn.digitaloceanspaces.com/builds/SlapMyMac.app.zip';

export type VoicePack = {
	value: string;
	label: string;
	emoji: string;
	sample: string;
	desc: string;
	followUp?: string;
};

export const VOICE_PACKS: VoicePack[] = [
	{
		value: 'woman',
		label: 'Woman',
		emoji: '💋',
		sample: '/samples/sexy.mp3',
		desc: 'Your MacBook gets... expressive. Use headphones.'
	},
	{
		value: 'combo',
		label: 'Combo Hit',
		emoji: '👊',
		sample: '/samples/punch.mp3',
		followUp: '/samples/combo.mp3',
		desc: 'Fighting game combos. Chain slaps for ULTRA COMBO! K.O.!'
	},
	{
		value: 'whiny',
		label: 'Whiny',
		emoji: '🗣️',
		sample: '/samples/male.mp3',
		desc: 'Ouch. Ow. Hey! Classic pain energy.'
	},
	{
		value: 'fart',
		label: 'Fart',
		emoji: '💨',
		sample: '/samples/fart.mp3',
		desc: 'Biological warfare. Your laptop fights back with gas.'
	},
	{
		value: 'gentleman',
		label: 'Gentleman',
		emoji: '🎩',
		sample: '/samples/gentleman.wav',
		desc: 'Polite disapproval. A dignified response to violence.'
	},
	{
		value: 'yamete',
		label: 'Yamete',
		emoji: '🍒',
		sample: '/samples/yamete.mp3',
		desc: 'Yamete kudasai! Your laptop begs you to stop — in Japanese.'
	},
	{
		value: 'goat',
		label: 'Goat',
		emoji: '🐐',
		sample: '/samples/goat.mp3',
		desc: 'BAAAH. Your MacBook is now a farm animal. No further questions.'
	}
];

export const FAQ_ITEMS: { q: string; a: string }[] = [
	{
		q: 'Will I void my MacBook warranty with SlapMyMac?',
		a: "Probably not — but we're not lawyers. SlapMyMac uses the built-in accelerometer, no hardware mods. That said, if you slap hard enough to crack your screen, that's on you."
	},
	{
		q: 'Does it work on Intel Macs?',
		a: "No. SlapMyMac requires an M1PRO+ MacBook because it reads the built-in accelerometer, which isn't available on Intel Macs."
	},
	{
		q: 'Can I add my own sounds?',
		a: 'Yes. In Settings you can add custom sound packs from a folder on your Mac and assign them to slap, USB, lid creak, and other triggers — on top of the 7 built-in voice packs and 130+ clips.'
	},
	{
		q: 'Does it drain my battery?',
		a: 'Barely. SlapMyMac polls the accelerometer at ~12.5 Hz, which is negligible. It uses less energy than most menu bar apps.'
	},
	{
		q: 'Will it trigger during normal typing?',
		a: "No. The detection pipeline uses 5 algorithms that vote on whether a real slap happened. Typing, closing the lid, or bumping your desk won't trigger it — unless you crank the sensitivity to max."
	},
	{
		q: 'Can I get a refund?',
		a: "If the app doesn't work on your machine, reach out and we'll sort it out. But no refunds for slapping too hard or breaking stuff."
	},
	{
		q: "It's too expensive. Can I get a discount?",
		a: "Two bucks is the whole deal — no coupons, no hoops. Cheaper than replacing the coffee you spilled while laughing."
	},
	{
		q: 'Is there a Windows version?',
		a: "No. This is a Mac-only experience. Windows laptops don't have feelings."
	}
];

export const FEATURE_GRID = [
	{
		title: 'Menu bar only',
		body: 'No dock icon. Lurks silently.'
	},
	{
		title: 'Volume scales with force',
		body: 'Gentle tap? Whisper. Full slap? Full volume.'
	},
	{
		title: 'Adjustable sensitivity',
		body: 'From "earthquake detector" to "needs a running start".'
	},
	{
		title: 'Cooldown timer',
		body: 'Prevents meltdowns during rapid slaps.'
	},
	{
		title: 'USB Moaner',
		body: "Plug or unplug a USB device. It moans. You're welcome."
	},
	{
		title: 'Launch at login',
		body: 'Always ready. Always listening.'
	},
	{
		title: 'Slap counter',
		body: 'Tracks your lifetime slaps in the menu bar. High score pending.'
	},
	{
		title: 'Onboarding',
		body: 'A polite welcome before the chaos begins.'
	},
	{
		title: 'Custom sound packs',
		body: 'Drop in your own folders of clips in Settings. Your MacBook, your samples.'
	}
];

export const NERDY_ALGORITHMS = [
	{
		name: 'High-Pass Filter',
		desc: 'Strips out gravity so we only see impacts'
	},
	{
		name: 'STA/LTA Ratio',
		desc: 'Compares short-term vs long-term averages at 3 timescales'
	},
	{
		name: 'CUSUM',
		desc: 'Detects sudden shifts in acceleration'
	},
	{
		name: 'Kurtosis',
		desc: '4th statistical moment — finds sharp spikes'
	},
	{
		name: 'Peak/MAD',
		desc: 'Median Absolute Deviation outlier detection'
	}
];

export const PAST_RELEASES = [
	{
		v: 'v1.3.0',
		text: 'Custom sound packs from local folders, assignable to slap / USB / lid and more'
	},
	{
		v: 'v1.0.16',
		text: 'About page, commentator voice toggle, heavy punches at max combo, brand color update'
	},
	{
		v: 'v1.0.15',
		text: 'Combo Hit soundpack with tiered combos & screen flash, punch SFX + commentator'
	},
	{ v: 'v1.0.14', text: 'Bugfixes' },
	{ v: 'v1.0.13', text: 'New goat soundpack' },
	{ v: 'v1.0.9', text: 'Bugfixes, dock icon, detection improvements' }
];
