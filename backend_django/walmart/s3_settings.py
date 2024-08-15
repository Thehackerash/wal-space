import environ
env = environ.Env()
import os
import boto3
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

s3_client = boto3.client(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY_ID.strip(),
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY.strip(),
    region_name=AWS_S3_REGION_NAME.strip()
) 
print(s3_client)

def upload_img(buf_img, name):
    s3_client.upload_fileobj(buf_img, AWS_STORAGE_BUCKET_NAME, name)
    return f"{MEDIA_URL}{name}"

#testing s3 
import qrcode
import io
from PIL import Image

def test():
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data('Some data to encode')  # Replace with your QR code data
    qr.make(fit=True)

    img = qr.make_image(fill='black', back_color='white')

    # Save QR code to a BytesIO object
    buf = io.BytesIO()
    img.save(buf, format='PNG')
    buf.seek(0)

    print(img)
    print(upload_img(buf, "img.png"))
    
from botocore.exceptions import NoCredentialsError, PartialCredentialsError, ClientError

def test_s3_connection(bucket_name):
    try:

        # List objects in the specified bucket
        response = s3_client.list_objects_v2(Bucket=bucket_name)

        # Check if the bucket is empty or contains objects
        # if 'Contents' in response:
        #     print(f"Objects in bucket '{bucket_name}':")
        #     for obj in response['Contents']:
        #         print(f" - {obj['Key']}")
        # else:
        #     print(f"The bucket '{bucket_name}' is empty or does not exist.")

        return True  # Connection was successful

    except NoCredentialsError:
        print("Error: No AWS credentials found.")
        return False

    except PartialCredentialsError:
        print("Error: Incomplete AWS credentials.")
        return False

    except ClientError as e:
        # Check if the error is related to the bucket not being found
        if e.response['Error']['Code'] == '404':
            print(f"Error: Bucket '{bucket_name}' not found.")
        else:
            print(f"ClientError: {e}")
        return False

    except Exception as e:
        print(f"Unexpected error: {e}")
        return False

# Usage example
bucket_name = 'walmart-qrcode'
is_connected = test_s3_connection(bucket_name)
print(f"s3 bucket {bucket_name} connected: {is_connected}")
