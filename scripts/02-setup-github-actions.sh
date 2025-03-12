source .env

GCP_SA_GITHUB_ACTIONS_EXISTS=$(gcloud iam service-accounts list --project "${GCP_PROJECT_ID}" | grep "${GCP_SA_GITHUB_ACTIONS}")
GCP_SA_BUILD_EXISTS=$(gcloud iam service-accounts list --project "${GCP_PROJECT_ID}" | grep "${GCP_SA_BUILD}")
GCP_SA_DEPLOY_AUTO_EXISTS=$(gcloud iam service-accounts list --project "${GCP_PROJECT_ID}" | grep "${GCP_SA_DEPLOY_AUTO}")
GCP_SA_DEPLOY_EXEC_EXISTS=$(gcloud iam service-accounts list --project "${GCP_PROJECT_ID}" | grep "${GCP_SA_DEPLOY_EXEC}")

# 1. Create a Google Cloud Service Account(s).

# 1.a\ sa-github
if [[ "${GCP_SA_GITHUB_ACTIONS_EXISTS}" ]]; then
    echo "Service Account ${GCP_SA_GITHUB_ACTIONS} already exists."
else
    gcloud iam service-accounts create "${GCP_SA_GITHUB_ACTIONS}" \
      --project "${GCP_PROJECT_ID}"
fi

# 1.b\ sa-build
if [[ "${GCP_SA_BUILD_EXISTS}" ]]; then
    echo "Service Account ${GCP_SA_BUILD} already exists."
else
    gcloud iam service-accounts create "${GCP_SA_BUILD}" \
      --project "${GCP_PROJECT_ID}"
fi

# 1.c\ sa-deploy-auto
if [[ "${GCP_SA_DEPLOY_AUTO_EXISTS}" ]]; then
    echo "Service Account ${GCP_SA_DEPLOY_AUTO} already exists."
else
    gcloud iam service-accounts create "${GCP_SA_DEPLOY_AUTO}" \
      --project "${GCP_PROJECT_ID}"
fi

# 1.d\ sa-deploy-exec
if [[ "${GCP_SA_DEPLOY_EXEC_EXISTS}" ]]; then
    echo "Service Account ${GCP_SA_DEPLOY_EXEC} already exists."
else
    gcloud iam service-accounts create "${GCP_SA_DEPLOY_EXEC}" \
      --project "${GCP_PROJECT_ID}"
fi

# 2. Create a Workload Identity Pool.
gcloud iam workload-identity-pools create "github" \
  --project="${GCP_PROJECT_ID}" \
  --location="global" \
  --display-name="GitHub Actions Pool"

# 3. Create a Workload Identity Provider in that pool.
gcloud iam workload-identity-pools providers create-oidc "${GITHUB_ORG:0:5}-${GITHUB_REPO}" \
  --project="${GCP_PROJECT_ID}" \
  --location="global" \
  --workload-identity-pool="github" \
  --display-name="GitHub repo Provider" \
  --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner" \
  --attribute-condition="assertion.repository_owner == '${GITHUB_ORG}'" \
  --issuer-uri="https://token.actions.githubusercontent.com"

WORKLOAD_IDENTITY_POOL_ID=$(gcloud iam workload-identity-pools describe "github" \
  --project="${GCP_PROJECT_ID}" \
  --location="global" \
  --format="value(name)")

# 4. Allow authentications from the Workload Identity Pool to your Google Cloud Service Account.
gcloud iam service-accounts add-iam-policy-binding "${GCP_SA_GITHUB_ACTIONS}@${GCP_PROJECT_ID}.iam.gserviceaccount.com" \
  --project="${GCP_PROJECT_ID}" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/${WORKLOAD_IDENTITY_POOL_ID}/attribute.repository/${GITHUB_ORG}/${GITHUB_REPO}"

# 5. Extract the Workload Identity Provider resource name.
GCP_WI_PROVIDER_ID=$(gcloud iam workload-identity-pools providers describe "${GITHUB_ORG:0:5}-${GITHUB_REPO}" \
  --project="${GCP_PROJECT_ID}" \
  --location="global" \
  --workload-identity-pool="github" \
  --format="value(name)")

cat << EOF

----- GITHUB ACTIONS ENV KEY/VALUE -----

GCP_SA_GITHUB_ACTIONS: ${GCP_SA_GITHUB_ACTIONS}
GCP_PROJECT_ID: ${GCP_PROJECT_ID}
GCP_LOCATION: ${GCP_LOCATION}
GCP_WI_PROVIDER_ID: ${GCP_WI_PROVIDER_ID}

----------------------------------------
EOF

echo "GCP_WI_PROVIDER_ID=\"${GCP_WI_PROVIDER_ID}\"" >> .env

if ! [ $(command -v gh) ]
then
  echo "bash: gh: command not found"
  echo "Consider installing gh cli at: https://github.com/cli/cli#installation"
fi

# figure out if we're logged into the gh CLI and that the gh command exists
if [ $(command -v gh) ]; then
  gh auth status > /dev/null 2>&1
  if [ $? -eq 0 ]; then
    echo "gh: command found and logged into GitHub"
    echo "gh: setting variables"

    gh variable set GCP_SA_GITHUB_ACTIONS --body "$GCP_SA_GITHUB_ACTIONS" --repo ${GITHUB_ORG}/${GITHUB_REPO}
    gh variable set GCP_PROJECT_ID --body "$GCP_PROJECT_ID" --repo ${GITHUB_ORG}/${GITHUB_REPO}
    gh variable set GCP_LOCATION --body "$GCP_LOCATION" --repo ${GITHUB_ORG}/${GITHUB_REPO}
    gh variable set GCP_WI_PROVIDER_ID --body "$GCP_WI_PROVIDER_ID" --repo ${GITHUB_ORG}/${GITHUB_REPO}
  fi
fi
