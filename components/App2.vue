<template>
	<div id="app">
		<h1></h1>
		<h2>Essential Links</h2>
		<ul>
			<li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
			<li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
			<li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
			<li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'app',
	data() {
		return {
			msg: 'Welcome to Your App2.vue'
		}
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

h1, h2 {
	font-weight: normal;
}

ul {
	list-style-type: none;
	padding: 0;
}

li {
	display: inline-block;
	margin: 0 10px;
}

a {
	color: #42b983;
}
</style>
