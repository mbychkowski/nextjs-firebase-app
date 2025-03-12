source .env

# This scripts adds IAM permissions for Serivce Accounts.
# - sa-github
# - sa-build
# - sa-deploy-auto
# - sa-deploy-exec

# Add roles to Google Cloud Service Account | sa-github
for SUCCINCT_ROLE in \
    cloudbuild.builds.editor \
    clouddeploy.operator \
    iam.serviceAccountUser \
    logging.configWriter \
    resourcemanager.projectIamAdmin \
    serviceusage.serviceUsageConsumer \
    storage.admin \
    storage.objectAdmin \
    ; do

  gcloud projects add-iam-policy-binding "$GCP_PROJECT_ID" \
    --member="serviceAccount:${GCP_SA_GITHUB_ACTIONS}@${GCP_PROJECT_ID}.iam.gserviceaccount.com" \
    --role "roles/$SUCCINCT_ROLE" \
    --condition=None

done

# Add roles to Google Cloud Service Account | sa-build
for SUCCINCT_ROLE in \
    artifactregistry.writer \
    cloudbuild.builds.editor \
    clouddeploy.releaser \
    iam.serviceAccountUser \
    logging.logWriter \
    secretmanager.secretAccessor \
    serviceusage.serviceUsageConsumer \
    storage.admin \
    storage.objectUser \
    ; do

  gcloud projects add-iam-policy-binding "$GCP_PROJECT_ID" \
    --member="serviceAccount:sa-build@${GCP_PROJECT_ID}.iam.gserviceaccount.com" \
    --role "roles/$SUCCINCT_ROLE" \
    --condition=None

done

# Add roles to Google Cloud Service Account | sa-deploy-auto
for SUCCINCT_ROLE in \
    cloudbuild.builds.editor \
    clouddeploy.developer \
    clouddeploy.releaser \
    clouddeploy.jobRunner \
    ; do

  gcloud projects add-iam-policy-binding "$GCP_PROJECT_ID" \
    --member="serviceAccount:sa-deploy-auto@${GCP_PROJECT_ID}.iam.gserviceaccount.com" \
    --role "roles/$SUCCINCT_ROLE" \
    --condition=None

done

# Add roles to Google Cloud Service Account | sa-deploy-exec
for SUCCINCT_ROLE in \
    artifactregistry.reader \
    container.developer \
    logging.logWriter \
    run.developer \
    storage.objectAdmin \
    ; do

  gcloud projects add-iam-policy-binding "$GCP_PROJECT_ID" \
    --member="serviceAccount:sa-deploy-exec@${GCP_PROJECT_ID}.iam.gserviceaccount.com" \
    --role "roles/$SUCCINCT_ROLE" \
    --condition=None

done

gcloud iam service-accounts add-iam-policy-binding \
  "sa-deploy-exec@${GCP_PROJECT_ID}.iam.gserviceaccount.com" \
  --member="serviceAccount:sa-deploy-auto@${GCP_PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser" \
  --condition=None
