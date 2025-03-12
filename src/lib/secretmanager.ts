import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

// 123507910180

export async function AccessSecret(projectNumber: string, secretId: string, versionId: string) {
  const client = new SecretManagerServiceClient();

  const [accessResponse] = await client.accessSecretVersion({
    name: `projects/${projectNumber}/secrets/${secretId}/versions/${versionId}`
  })

  const responsePayload = accessResponse.payload?.data?.toString();

  return responsePayload
}
