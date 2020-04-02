using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppyHealthWeb
{
   
    public class NPIResponseModel
    {
        public NPIResponseModel()
        {
        }
        public string NPI { get; set; }


        public string Entity_Type_Code { get; set; }


        public string Provider_Organization_Name_Legal_Business_Name { get; set; }


        public string Provider_Last_Name_Legal_Name { get; set; }


        public string Provider_First_Name { get; set; }


        public string Provider_Middle_Name { get; set; }


        public string Provider_Name_Prefix_Text { get; set; }


        public string Provider_Name_Suffix_Text { get; set; }

        public string Provider_Credential_Text { get; set; }

        public string Provider_First_Line_Business_Mailing_Address { get; set; }


        public string Provider_Second_Line_Business_Mailing_Address { get; set; }


        public string Provider_Business_Mailing_Address_City_Name { get; set; }

        public string Provider_Business_Mailing_Address_State_Name { get; set; }


        public string Provider_Business_Mailing_Address_Postal_Code { get; set; }


        public string Provider_Business_Mailing_Address_Telephone_Number { get; set; }




        public string FullName
        {
            get
            {
                if (Entity_Type_Code == "1") return $" {Provider_Name_Prefix_Text} {Provider_First_Name} {Provider_Middle_Name} {Provider_Last_Name_Legal_Name}, {Provider_Credential_Text}";
                if (Entity_Type_Code == "2") return $" {Provider_Organization_Name_Legal_Business_Name}";

                return string.Empty;
            }
        }
    }
}
