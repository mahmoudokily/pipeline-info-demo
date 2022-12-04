#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { HelloCdkStack } from "../lib/hello-cdk-stack";

const app = new cdk.App();
new HelloCdkStack(app, "HelloCdkStack", {
  env: { account: "929633622722", region: "us-east-1" },
});

app.synth();
