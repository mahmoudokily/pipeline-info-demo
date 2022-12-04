import * as sdk from "aws-cdk-lib";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import * as path from "path";
export class MyLambadaStack extends sdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    stageName: string,
    props?: sdk.StackProps
  ) {
    super(scope, id, props);
    new Function(this, "lambdaFunction", {
      runtime: Runtime.NODEJS_18_X,
      handler: "handler.handler",
      code: Code.fromAsset(path.join(__dirname, "lambda")),
      environment: { stageName: stageName },
    });
  }
}
