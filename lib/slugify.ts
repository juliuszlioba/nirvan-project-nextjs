const slugify = (string: string) => {
	var a =
		'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
	var b =
		'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------'
	var p = new RegExp(a.split('').join('|'), 'g')

	string = string.toString()
	string = string.toLowerCase()
	string = string.replace(/ä/g, 'ae')
	string = string.replace(/ö/g, 'oe')
	string = string.replace(/ü/g, 'ue')
	string = string.replace(/ß/g, 'ss')
	string = string.replace(/\s+/g, '-') // Replace spaces with -
	//string = string.replace(p, c => b.charAt(a.indexOf(c)));
	for (var i: any = 0, l = a.length; i < l; i++) {
		string = string.replace(p, b.charAt(a.indexOf(i)))
	} // Replace special characters
	string = string.replace(/&/g, '-und-') // Replace & with 'and'
	string = string.replace(/[^\w\-]+/g, '') // Remove all non-word characters
	string = string.replace(/\-\-+/g, '-') // Replace multiple - with single -
	string = string.replace(/^-+/, '') // Trim - from start of text
	string = string.replace(/-+$/, '') // Trim - from end of text

	return string
}

export default slugify
