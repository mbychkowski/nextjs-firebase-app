source .env

_GCP_PROJECT_ID_TARGET_DEV=$(gcloud config get-value project)

# Request acceptance of defaults or alternatives
read -p "Enter GCP project ID for dev target [${_GCP_PROJECT_ID_TARGET_DEV}]: " GCP_PROJECT_ID_TARGET_DEV

GCP_PROJECT_ID_TARGET_DEV="${GCP_PROJECT_ID_TARGET_DEV:-`echo $_GCP_PROJECT_ID_TARGET_DEV`}"

cat << EOF

----------------------------------------
------- GOOGLE CLOUD TARGET ENV --------
----------------------------------------

GCP_PROJECT_ID:            ${GCP_PROJECT_ID}
GCP_PROJECT_ID_TARGET_DEV: ${GCP_PROJECT_ID_TARGET_DEV}


EOF

# figure out if we're logged into the gh CLI and that the gh command exists
if [ $(command -v gh) ]; then
  gh auth status > /dev/null 2>&1
  if [ $? -eq 0 ]; then
    echo "gh: command found and logged into GitHub"
    echo "gh: setting variables"

    gh variable set GCP_PROJECT_ID_TARGET_DEV --body "$GCP_PROJECT_ID_TARGET_DEV" --repo ${GITHUB_ORG}/${GITHUB_REPO}
  fi
fi