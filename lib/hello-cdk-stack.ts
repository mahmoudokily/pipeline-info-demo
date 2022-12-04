import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { MyPipelineAppStage } from "./stage";
import { ManualApprovalStep } from "aws-cdk-lib/pipelines";
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

    const testingStage = Pipeline.addStage(
      new MyPipelineAppStage(this, "stage", {
        env: {
          account: "929633622722",
          region: "us-east-1",
        },
      })
    );
    testingStage.addPost(
      new ManualApprovalStep("Manual Approval before production")
    );

    const prodStage = Pipeline.addStage(
      new MyPipelineAppStage(this, "prod", {
        env: {
          account: "929633622722",
          region: "us-east-1",
        },
      })
    );
  }
}
