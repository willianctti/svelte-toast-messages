<script lang="ts">
	import Test from './lib/Test.svelte';
	import AnotherTest from './lib/AnotherTest.svelte';
	import ToastList from './lib/ToastList.svelte';
	export let name: string;
  </script>
  
  <main>
	<h1>Hello {name}!</h1>
	<Test />
	<AnotherTest />
  </main>
  
  <ToastList />