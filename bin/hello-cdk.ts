#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { HelloCdkStack } from "../lib/hello-cdk-stack";

const app = new cdk.App();
new HelloCdkStack(app, "HelloCdkStack", {
  //put here the correct env variable
  // env: { account: '123456789012', region: 'us-east-1' },
});

app.synth();
