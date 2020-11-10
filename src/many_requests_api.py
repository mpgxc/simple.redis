import requests
from random import randint


tcolors = {
    "OK": '\033[92m',
    "FAIL": '\033[91m',
    "ENDC": '\033[0m',
    "BOLD": '\033[1m',
}


def print_with_color(color: str, data: dict) -> str:
    print(tcolors[color.upper()], tcolors['BOLD'], data, tcolors["ENDC"])


def main():

    base_url = "http://localhost:3333/"

    for _ in range(500):

        random_limit_value = randint(10, 1050)

        response = \
            requests.get(base_url + "api/search/" + str(random_limit_value))

        response_json = response.json()

        if(response.status_code == 429):
            print_with_color('FAIL', response_json)

        else:
            print_with_color('OK', response_json)

        print()


if __name__ == "__main__":

    main()
