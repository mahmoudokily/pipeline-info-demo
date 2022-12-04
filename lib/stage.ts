import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { MyLambadaStack } from "./lambda-stack";

export class MyPipelineAppStage extends cdk.Stage {
  constructor(scope: Construct, stageName: string, props?: cdk.StackProps) {
    super(scope, stageName, props);

    const lambadaStack = new MyLambadaStack(this, "LambadaStack", stageName);
  }
}
