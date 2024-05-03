import os
import asyncio
from dotenv import load_dotenv
from asyncio import run

from ya_tracker_client import YaTrackerClient
from yandex_tracker_client import TrackerClient, exceptions  # другая библиотека их две вообще, ниже по функциональнее будет


load_dotenv()

API_TOKEN = os.getenv("API_TOKEN")
API_ORGANISATION_ID = os.getenv("API_ORGANISATION_ID")


def client_tracker():
    client = YaTrackerClient(
        oauth_token=API_TOKEN,
        organisation_id=API_ORGANISATION_ID
    )
    return client


async def get_issues():
    client = client_tracker()
    try:
        issues = await client.find_issues()
        print([issue.dict() for issue in issues])
        return [issue.dict() for issue in issues]
    finally:
        await client.stop()


#
if __name__ == "__main__":
    asyncio.run(get_issues())

    # def client_tracker():
    #     client = TrackerClient(
    #         token=API_TOKEN,
    #         org_id=API_ORGANISATION_ID,
    #     )
    #     return client
    #
    #
    # async def get_issues():
    #     client = client_tracker()
    #
    #     # Предполагаем, что метод для получения задач имеет другой интерфейс
    #     issues = client.queues.fields
    #     print(issues)
    #     return issues

    # async def main():
    #     issues = await get_issues()
    #     for issue in issues:
    #         print(issue)

    # if __name__ == "__main__":
    #     asyncio.run(get_issues())