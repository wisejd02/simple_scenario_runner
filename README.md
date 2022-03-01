# simple_scenario_runner
node json task and flow runner

The aim is to build a simple universal scenario runner that has a scenario as a config and runs its
stages. 
1. Show/display flow states each N seconds to monitor the progress
2. In the end show total flow processing time.
3. Task resolvers should run asynchronously.
4. The flow should be finished in the “stop” state.
5. On every state run resolver task, once task success moves to the next step.
6. If a task fails, the task resolver should provide an exception flow and run an exception task.
7. The tasks should be asynchronous and execution time randomly from 1 to 10 seconds. In case
execution time is more than 9 seconds - resolver should respond with failure and the scenario
should continue with an exception flow.
8. The Monitor should show periodically (5 seconds)
* flow id
* flow name
* state (the step name or "finished")
* start time
* execution time

-->to run dwonload git repo and in root folder of script use "node ." to execute.
-->uses predefined json file in predefined location

