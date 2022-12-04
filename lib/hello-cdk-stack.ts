import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { MyPipelineAppStage } from "./stage";
import { ManualApprovalStep } from "aws-cdk-lib/pipelines";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as iam from "aws-cdk-lib/aws-iam";

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create s3 bucket to store the website files
    const bucket = new s3.Bucket(this, "WebsiteBucket", {
      bucketName: "techit-website",
      websiteIndexDocument: "index.html",
      blockPublicAccess: new s3.BlockPublicAccess({
        restrictPublicBuckets: false,
      }), // 2
    });
    const bucketPolicy = new iam.PolicyStatement({
      actions: ["s3:GetObject"],
      resources: [`${bucket.bucketArn}/*`],
      principals: [new iam.AnyPrincipal()],
    });
    bucket.addToResourcePolicy(bucketPolicy);

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
