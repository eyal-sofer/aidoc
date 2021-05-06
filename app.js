const express = require("express");
const port = 80;
const app = express();
const path = require("path");

function getContainerIP(servicename){
    // note: assumes that only 1 task with 1 container is in the provided service, and that a container only has 1 network interface

    return new Promise(function(resolve, reject){

      // get task arns (needs a delay because we just launched it)
      setTimeout(getTasks, 6000);

      // get task arns
      function getTasks(){
        ecs.listTasks({
          cluster: process.env.ecs_cluster,
          launchType: "FARGATE",
          serviceName: servicename
        },function(err, res){
          if(err){
            reject("Unable to get task list");
            return;
          }

          // loop until we have a result
          if(!res.taskArns.length){
            setTimeout(getTasks, 2000);
            return;
          }

          // get details
          getTaskDetails(res.taskArns);
        });
      }

      // get the details of the task (we assume only one task because that's how its configured)
      function getTaskDetails(taskArns){
        ecs.describeTasks({
          cluster: process.env.ecs_cluster,
          tasks: taskArns
        },function(err,res){
          if(err){
            reject("Unable to get task details");
            return;
          }

          // no results
          if(!res.tasks.length || !res.tasks[0].attachments.length){
            reject("No tasks available");
            return;
          }

          // network needs to be in status ATTACHING to see the eni, else wait
          if(res.tasks[0].attachments[0].status !== "ATTACHING"){
            setTimeout(function(){ getTaskDetails(taskArns); }, 2000);
            return;
          }

          // get network ID from result
          let eni = "";
          for(let i in res.tasks[0].attachments[0].details){
            if(!res.tasks[0].attachments[0].details.hasOwnProperty(i)) continue;
            if(res.tasks[0].attachments[0].details[i].name !== "networkInterfaceId") continue;

            // get the eni
            eni = res.tasks[0].attachments[0].details[i].value;
            break;
          }

          // no eni
          if(eni === ""){
            reject("Unable to retrieve container ENI");
            return;
          }

          // get network details
          getNetworkDetails(eni);
        });
      }

      // get network details
      function getNetworkDetails(eni){

        // get the ENI details
        ec2.describeNetworkInterfaces({
          NetworkInterfaceIds: [eni]
        }, function(err, res) {
          if(err){
            reject("Unable to retrieve ENI details");
            return;
          }

          // confirm available data
          if(!res.NetworkInterfaces.length || typeof res.NetworkInterfaces[0].Association === "undefined" || typeof res.NetworkInterfaces[0].Association.PublicIp === "undefined"){
            reject("Unable to retrieve IP from ENI details");
            return;
          }

          // resolve the public IP address
          resolve(res.NetworkInterfaces[0].Association.PublicIp);
        });
      }
    });
}

// get container IP
getContainerIP("ecs-devops-sandbox-service").then(ip=>{
    console.log("Container IP address is: " + ip);

}).catch(err=>{
    console.log(err);
});

app.get('/myapp/', function(req, res){
    res.send("Hello from the root application URL");
});

app.get('/ip/', function(req, res){
    res.send("Container IP address is: " + ip);
});

app.listen(port, () => console.log('Application is running'));

