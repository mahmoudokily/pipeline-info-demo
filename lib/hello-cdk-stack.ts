import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { aws_s3 as s3 } from "aws-cdk-lib";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const Pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "TestTechit",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub(
          "mahmoudokily/pipeline-info-demo",
          "main"
        ),
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });
  }
}
