var data= {
		name: 'gData',
		output: 'NULL'
	};

const template1= `<div>
				<h4>Template1</h4>
				</div>`,
	  template2= `<div>
				<h4>Template2</h4>
				<button v-on:click="changeOutput">Change output</button>
				<p>Hey there, I am <code>{{name}}</code> my output is <code>{{output}}</code></p>
				</div>`;

Vue.component('component1', {
	template: template1
});

Vue.component('component2', {
	template: template2,
	data: function() {	//for global "data" var
		return data;
	},
	methods: {
		changeOutput: function() {
			this.output= 'component2 methods';
		}
	}
});

new Vue({
	el: '#app2',
	data: function() {	//for global "data" var
		return data;
	},
	methods: {
		changeOutput: function() {
			this.output= 'app2 methods';
		},
		readRefs: function() {
			console.log(this.$refs);
			this.output= this.$refs.myRef.value;
		}
	}
});

new Vue({
	el: '#app',
	data: {
		name: 'app',
		age: 0,
		x: 0,
		y: 0,
		a: '',
		b: '',
		available: false,
		nearby: false,
		error: false,
		succes: false,
		sons: [
			{name: 'Youcef', age: 11},
			{name: 'Younes', age: 9},
			{name: 'Mohamed', age: 1.5}
		]
	},
	methods: {	// always execute
		addToAge: function(inc) {
			this.age+= inc;
		},
		substractFromAge: function(dec) {
			this.age-= dec;
		},
		updateXY: function(event) {
			this.x= event.offsetX;
			this.y= event.offsetY;
			console.log(event);
		},
		click: function() {
			alert('You clicked me! not other one!')
		}
	},
	computed: {	//execute only if one dependant at least changes, read from cache if not (see watchers for more options)
		ageAndA: function() {
			return this.age+ this.a;
		},
		ageAndB: function() {
			return this.age+ this.b;
		},
		getClasses: function() {
			return {
				available: this.available,
				nearby: this.nearby
			}
		}
	}
})