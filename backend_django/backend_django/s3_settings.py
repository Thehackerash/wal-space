import environ
env = environ.Env()
import os
env_file = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
environ.Env.read_env(env_file)

# s3_settings.py

AWS_ACCESS_KEY_ID = env('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = env('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = env('AWS_STORAGE_BUCKET_NAME')
AWS_S3_REGION_NAME = env('AWS_S3_REGION_NAME')  # e.g., 'us-west-2'

AWS_S3_FILE_OVERWRITE = False
AWS_DEFAULT_ACL = None

# Static and Media Files
AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
STATIC_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/static/'
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/media/'

print("AWS_STORAGE_BUCKET_NAME:", AWS_STORAGE_BUCKET_NAME)